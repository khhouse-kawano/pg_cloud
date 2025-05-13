import Imap from 'node-imap';
import env from 'dotenv';
import { simpleParser } from 'mailparser';
env.config();

const imapClient = new Imap({
    user: process.env.GMAIL,
    password: process.env.GMAIL_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

const today = new Date();
const sinceDate = today.toISOString().split('T')[0]; // YYYY-MM-DD形式の今日の日付
const beforeDate = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0]; // 明日の日付（今日の24時までの範囲をカバー）

imapClient.once('error', (err) => {
    console.error('接続に失敗しました:', err);
});

imapClient.once('ready', () => {
    console.log('接続に成功しました！');
    imapClient.openBox('INBOX', true, (err, box) => {
        if (err) throw err;

        // 昨日から今日のメールを検索
        const searchCriteria = [['FROM', 'pgcloud@khg-marketing.info'],['SUBJECT', 'フォーム連携'],['SINCE', sinceDate],['BEFORE', beforeDate]];

        const fetchOptions = {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', '1', 'TEXT'],
            struct: true
        };

        console.log('検索条件:', searchCriteria);

        imapClient.search(searchCriteria, (err, results) => {
            if (err) throw err;

            console.log('検索結果:', results);

            if (results.length === 0) {
                console.log('該当するメールが見つかりませんでした');
                imapClient.end();
                return;
            }

            const f = imapClient.fetch(results, fetchOptions);

            f.on('message', (msg, seqno) => {
                const prefix = '(#' + seqno + ') ';
                msg.on('body', (stream, info) => {
                    simpleParser(stream, (err, parsed) => {
                        if (err) throw err;

                        const emailText = parsed.text || 'テキスト本文なし';
                        const regex = /タイムスタンプ：(.+?)(?=<br>)/;
                        const match = emailText.match(regex);
                        const extractedInfo = match ? match[1] : 'タイムスタンプ情報が見つかりませんでした';

                        console.log(prefix + '件名: ' + (parsed.subject || '件名なし'));
                        console.log(prefix + 'タイムスタンプ抽出情報:\n' + extractedInfo);
                    });
                });
            });

            f.once('error', (err) => {
                console.error('Fetchエラー:', err);
            });

            f.once('end', () => {
                console.log('全てのメッセージをフェッチしました');
                imapClient.end();
            });
        });
    });
});

imapClient.connect();
