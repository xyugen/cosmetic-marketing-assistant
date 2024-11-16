export const verificationCodeEmailTemplate = (token: string) => `
  <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <table width="100%" style="background-color: #f9f9f9; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600"
            style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
            <tr>
              <td align="center" style="padding: 10px;">
                <h1 style="color: #FDDC00; font-size: 24px; margin: 0;">D' Shine</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center;">
                <h2 style="color: #333333; font-size: 20px; margin: 0;">Your Verification Code</h2>
                <p style="color: #666666; font-size: 16px; margin: 10px 0;">
                  Please use the code below to verify your email address and access your account.
                </p>
                <div
                  style="background-color: #FDDC00; padding: 15px; border-radius: 5px; display: inline-block; margin: 20px 0;">
                  <h3 style="color: #313131; font-size: 24px; margin: 0;">${token}</h3>
                </div>
                <p style="color: #666666; font-size: 14px; margin: 10px 0;">
                  This code will expire in 10 minutes. If you didn&apos;t request this code, please ignore this
                  email.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #999999; font-size: 12px; margin: 0;">
                  &copy; 2024 D' Shine. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;

export const verificationLinkEmailTemplate = (link: string) => `
  <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <table width="100%" style="background-color: #f9f9f9; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600"
            style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
            <tr>
              <td align="center" style="padding: 10px;">
                <h1 style="color: #FDDC00; font-size: 24px; margin: 0;">D' Shine</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center;">
                <h2 style="color: #333333; font-size: 20px; margin: 0;">Verify Your Email Address</h2>
                <p style="color: #666666; font-size: 16px; margin: 10px 0;">
                  Click the button below to verify your email and complete your registration with D'
                  Shine.
                </p>
                <a href="${link}"
                  style="display: inline-block; background-color: #FDDC00; color: #313131; padding: 15px 30px; text-decoration: none; font-size: 16px; border-radius: 5px; margin: 10px 0;">
                  Verify Email
                </a>
                <p style="color: #666666; font-size: 16px; margin: 10px 0 5px 0;">
                  If the button above didn't work, click the link below:
                </p>
                <a href="${link}" style="color: #d1a400;">${link}</a>
                <p style="color: #666666; font-size: 14px; margin: 10px 0;">
                  This link will expire in 10 minutes. If you didn’t request this code, please ignore this
                  email.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #999999; font-size: 12px; margin: 0;">
                  &copy; 2024 D' Shine. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;