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
	<div style="background-color: #f6f9fc; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
	<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e6e9ee;">
		<div style="background-color: #1a1a1a; padding: 30px; text-align: center;">
			<h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">ROOF<span style="color: #f15628;">HERO</span></h1>
			<p style="color: #999; margin-top: 5px; font-size: 13px; text-transform: uppercase;">Sydney's Trusted Roofing Network</p>
		</div>
		<div style="padding: 40px;">
			<h2 style="color: #1a1a1a; font-size: 22px; margin-bottom: 20px;">Onboarding Approved</h2>
			<p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
				Hello <strong>${fullName || 'Contractor'}</strong>,
			</p>
			<p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
				We are pleased to inform you that your application to join the RoofHero contractor network has been <strong>formally approved</strong>. You now have full access to our project management suite.
			</p>
			<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 30px 0;">
				<p style="margin-top: 0; color: #64748b; font-size: 14px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Your Access Credentials</p>
				<div style="margin-bottom: 12px; display: flex;">
					<span style="color: #1a1a1a; width: 100px; font-weight: 600;">Login ID:</span>
					<span style="color: #4a5568; font-family: monospace; background: #edf2f7; padding: 2px 6px; border-radius: 4px;">${username}</span>
				</div>
				<div style="display: flex;">
					<span style="color: #1a1a1a; width: 100px; font-weight: 600;">Password:</span>
					<span style="color: #4a5568; font-family: monospace; background: #edf2f7; padding: 2px 6px; border-radius: 4px;">${password}</span>
				</div>
			</div>
			<div style="text-align: center; margin: 35px 0;">
				<a href="${loginUrl}" style="background-color: #fa5a25; color: #ffffff; padding: 14px 32px; text-decoration: none; font-weight: 600; border-radius: 6px; display: inline-block; transition: background 0.3s ease;">
					Login as Contractor
				</a>
			</div>
			<p style="color: #718096; font-size: 13px; text-align: center; font-style: italic;">
				For your security, you will be prompted to update your password upon your first login.
			</p>
		</div>
	</div>
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
