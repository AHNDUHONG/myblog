import nodemailer from "nodemailer";

function getTransporter() {
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = port === 465; // 465면 TLS
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

// 문의 답변 메일 발송
export async function sendContactReply(opts: {
    to: string;
    name: string;
    question: string;
    answer: string;
}) {
    const transporter = getTransporter();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || "";
    const subject = `문의에 대한 답변 드립니다.`;
    const text =
        `안녕하세요, ${opts.name}님.

        문의 주신 내용 잘 확인했습니다. 아래에 답변 드립니다.

        • 문의
        ${opts.question}

        • 답변
        ${opts.answer}

        추가 문의가 있으시면 언제든지 회신 부탁드립니다.
        감사합니다.
        MyBlog 드림`;
    
    const html = `
        <div style="background:#f6f8fb;padding:24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;">
                <tr>
                    <td style="padding:24px;font-family:Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Roboto, Arial, sans-serif;color:#111827;">
                    <div style="font-size:18px;font-weight:700;margin:0 0 12px 0;">MyBlog</div>
                    <p style="margin:0 0 8px 0;">안녕하세요, <strong>${escapeHtml(opts.name)}</strong>님.</p>
                    <p style="margin:0 0 16px 0;">문의 주신 내용 잘 확인했습니다. 아래에 답변 드립니다.</p>

                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

                    <p style="margin:0 0 6px 0;font-weight:700;">문의</p>
                    <div style="line-height:1.6;margin:0 0 8px 0;">
                        ${escapeHtml(opts.question).replace(/\\n/g, "<br/>")}
                    </div>

                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

                    <p style="margin:0 0 6px 0;font-weight:700;">답변</p>
                    <div style="line-height:1.6;margin:0 0 8px 0;">
                        ${escapeHtml(opts.answer).replace(/\\n/g, "<br/>")}
                    </div>

                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

                    <p style="margin:0 0 8px 0;">추가 문의가 있으시면 언제든지 회신 부탁드립니다.</p>
                    <p style="margin:0;color:#6b7280;">감사합니다.<br/>MyBlog 드림</p>
                    </td>
                </tr>
            </table>
        </div>
        `;

    const info = await transporter.sendMail({ from, to: opts.to, subject, text, html });
    return { messageId: info.messageId, subject };
}

// 간단한 HTML 이스케이프

function escapeHtml(s: string) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}