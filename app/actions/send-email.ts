"use server"

import emailjs from "@emailjs/nodejs"


interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  message: string
}


export async function sendContactEmail(formData: ContactFormData) {

  try {

    const templateParams = {
      to_email: "info@energeticnepal.com",

      from_name: formData.name,
      from_email: formData.email,

      phone: formData.phone,
      company: formData.company,
      project_type: formData.projectType,

      message: formData.message,
    }


    // Send email to company
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_ADMIN_TEMPLATE_ID!,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    )


    // Auto reply to customer
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_REPLY_TEMPLATE_ID!,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    )


    return {
      success: true,
      message: "Email sent successfully"
    }


  } catch (error) {

    console.error("EmailJS Error:", error)

    return {
      success: false,
      message: "Failed to send email"
    }

  }

}