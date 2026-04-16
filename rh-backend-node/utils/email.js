import nodemailer from 'nodemailer'

const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || process.env.ADMIN_EMAIL
  const emailPass = process.env.EMAIL_PASSWORD

  if (!emailUser || !emailPass) {
    throw new Error('Email transport requires EMAIL_USER and EMAIL_PASSWORD in environment variables.')
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  })
}

export const sendContractorApprovalEmail = async ({ toEmail, fullName, username, password }) => {
  const transporter = createTransporter()

  const subject = 'Your RoofHero Contractor Account Has Been Approved'
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
  const loginUrl = `${frontendUrl.replace(/\/$/, '')}/login`

  const text = `Hello ${fullName || 'Contractor'},\n\n` +
    'Congratulations! Your contractor application has been approved by RoofHero. You can now sign in and start bidding on projects.\n\n' +
    `Login ID: ${username}\n` +
    `Password: ${password}\n\n` +
    `Please log in at ${loginUrl} and change your password after your first login for security.\n\n` +
    'If you have any questions, reply to this email and our support team will assist you.\n\n' +
    'Best regards,\n' +
    'RoofHero Team'

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#333;line-height:1.5;max-width:680px;margin:0 auto;padding:24px;">
      <h2 style="color:#2b2b2b;border-bottom:1px solid #e1e1e1;padding-bottom:10px;">RoofHero Contractor Approval</h2>
      <p>Hello ${fullName || 'Contractor'},</p>
      <p>Congratulations! Your contractor onboarding request has been <strong>approved</strong> by the RoofHero admin team.</p>
      <p>Please use the credentials below to sign in and begin managing your contractor account:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr>
          <td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;width:150px;"><strong>Login ID</strong></td>
          <td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;">${username}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;"><strong>Password</strong></td>
          <td style="padding:10px;border:1px solid #ddd;background:#f9f9f9;">${password}</td>
        </tr>
      </table>
      <p style="margin:8px 0;">You can access your account here:</p>
      <p><a href="${loginUrl}" style="display:inline-block;padding:10px 18px;background:#f15628;color:#fff;text-decoration:none;border-radius:6px;">Go to Login</a></p>
      <p style="margin-top:20px;">For security, please change your password after your first login.</p>
      <p style="margin-top:24px;">If you need help, reply to this email and our team will assist you promptly.</p>
      <p style="margin-top:30px;color:#6d6d6d;">Best regards,<br/>RoofHero Team</p>
    </div>
  `

  await transporter.sendMail({
    from: process.env.EMAIL_USER || process.env.ADMIN_EMAIL,
    to: toEmail,
    subject,
    text,
    html,
  })
}
