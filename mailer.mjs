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

imapClient.once('error', (err) => {
    console.error('接続に失敗しました:', err);
});

imapClient.once('ready', () => {
    console.log('接続に成功しました！');
    imapClient.openBox('INBOX', true, (err, box) => {
        if (err) throw err;

        // ラベルIDを定数で定義し、誤りを防ぐ
        const TARGET_LABEL_ID = '7592762289515810201';

        // 検索条件を明確にする
        const searchCriteria = [['X-GM-LABELS', TARGET_LABEL_ID]];

        // 全てのラベルのメールを取得
        const fetchOptions = {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', '1'],
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
                        console.log(prefix + '件名: ' + (parsed.subject || '件名なし'));
                        console.log(prefix + 'テキスト本文: ' + (parsed.text || 'テキスト本文なし'));
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
