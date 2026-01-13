// This string is designed to be copied into the n8n HTML Email Node
export const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vé tham dự Workshop AI Workforce 2026</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #111111; border: 1px solid #333333; border-radius: 8px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 40px 0; background-color: #000000; border-bottom: 2px solid #7c3aed;">
                            <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #ffffff;">AI Workforce 2026</h1>
                            <p style="margin: 5px 0 0; color: #888888; font-size: 14px;">Rước Bot Về Nhà - Chăm Lo Việc Nhà</p>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #ffffff; margin-top: 0;">Xin chào, {{name}}!</h2>
                            <p style="color: #cccccc; line-height: 1.6;">Cảm ơn bạn đã đăng ký tham gia workshop. Chúng tôi rất hân hạnh được chào đón bạn đến với tương lai của nhân sự số.</p>
                            
                            <div style="margin: 30px 0; padding: 20px; background-color: #1a1a1a; border-left: 4px solid #7c3aed; border-radius: 4px;">
                                <p style="margin: 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mã vé của bạn</p>
                                <p style="margin: 5px 0 0; color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 2px;">{{ticket_id}}</p>
                            </div>

                            <p style="color: #cccccc; line-height: 1.6;">Hãy chuẩn bị sẵn sàng cho những kiến thức đột phá về AI.</p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top: 30px; width: 100%;">
                                <tr>
                                    <td align="center">
                                        <a href="https://zalo.me/your_group_link" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: bold; background-color: #7c3aed; border-radius: 4px; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);">
                                            Tham gia Group Zalo
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #000000; text-align: center; border-top: 1px solid #333333;">
                            <p style="margin: 0; color: #666666; font-size: 12px;">© 2024 GEARVN. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
