import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

/**
 * Built-in Medical & Platform Knowledge Base.
 * Provides instant, reliable answers even when GEMINI_API_KEY is not configured or rate-limited.
 */
function getLocalMedicalResponse(rawMessage) {
  const msg = rawMessage.toLowerCase().trim();

  // 1. Emergency Symptoms Check
  if (
    msg.includes("chest pain") ||
    msg.includes("heart attack") ||
    msg.includes("can't breathe") ||
    msg.includes("cannot breathe") ||
    msg.includes("shortness of breath") ||
    msg.includes("stroke") ||
    msg.includes("face droop") ||
    msg.includes("fainting") ||
    msg.includes("unconscious")
  ) {
    return (
      "🚨 **URGENT MEDICAL WARNING**: The symptoms you described can indicate a life-threatening medical emergency.\n\n" +
      "• **Immediate Action**: Call your local emergency services (such as 911 or 112) or go to the nearest emergency room immediately.\n" +
      "• Do not attempt to drive yourself if experiencing severe chest pain, dizziness, or shortness of breath.\n" +
      "• In Medilink, emergency doctors can access your blood group and allergy profile via the Emergency Lookup using your registered mobile number."
    );
  }

  // 2. Blood Pressure Queries
  if (
    msg.includes("blood pressure") ||
    msg.includes("bp") ||
    msg.includes("hypertension") ||
    msg.includes("systolic") ||
    msg.includes("diastolic")
  ) {
    return (
      "🩺 **Blood Pressure (BP) Clinical Guidelines**:\n\n" +
      "• **Normal / Optimal**: Systolic < 120 mmHg and Diastolic < 80 mmHg\n" +
      "• **Elevated**: Systolic 120–129 mmHg and Diastolic < 80 mmHg\n" +
      "• **Stage 1 Hypertension**: Systolic 130–139 mmHg or Diastolic 80–89 mmHg\n" +
      "• **Stage 2 Hypertension**: Systolic ≥ 140 mmHg or Diastolic ≥ 90 mmHg\n" +
      "• **Hypertensive Crisis**: Systolic > 180 mmHg and/or Diastolic > 120 mmHg (Requires immediate emergency medical care)\n\n" +
      "*Tips*: Avoid caffeine or exercise 30 minutes before taking readings. Sit quietly for 5 minutes with your back supported."
    );
  }

  // 3. Blood Sugar / Glucose / Diabetes
  if (
    msg.includes("glucose") ||
    msg.includes("sugar") ||
    msg.includes("diabetes") ||
    msg.includes("hba1c") ||
    msg.includes("hypoglycemia") ||
    msg.includes("hyperglycemia")
  ) {
    return (
      "🩸 **Blood Glucose & Diabetes Reference Ranges**:\n\n" +
      "• **Fasting Plasma Glucose** (8+ hours without food):\n" +
      "   - Normal: 70–99 mg/dL\n" +
      "   - Pre-diabetes (Impaired fasting): 100–125 mg/dL\n" +
      "   - Diabetes threshold: ≥ 126 mg/dL (on two separate tests)\n\n" +
      "• **Post-Prandial (2 hours after meal)**: Normal is typically < 140 mg/dL.\n" +
      "• **Hypoglycemia Alert**: Values below 70 mg/dL are abnormally low. Consume fast-acting carbs (fruit juice, honey) and consult a physician if recurring."
    );
  }

  // 4. Heart Rate / Pulse
  if (
    msg.includes("heart rate") ||
    msg.includes("pulse") ||
    msg.includes("bpm") ||
    msg.includes("tachycardia") ||
    msg.includes("bradycardia")
  ) {
    return (
      "❤️ **Heart Rate (Pulse) Clinical Reference**:\n\n" +
      "• **Normal Resting Heart Rate**: 60–100 beats per minute (BPM) for adults.\n" +
      "• **Athletic Resting**: Well-conditioned athletes may have normal resting rates between 40–60 BPM.\n" +
      "• **Tachycardia**: Resting heart rate persistently above 100 BPM.\n" +
      "• **Bradycardia**: Resting heart rate persistently below 60 BPM (when not an athlete).\n\n" +
      "*Note*: Stress, caffeine, fever, medications, and physical exertion can temporarily increase heart rate."
    );
  }

  // 5. Hemoglobin / Anemia / Iron
  if (
    msg.includes("hemoglobin") ||
    msg.includes("anemia") ||
    msg.includes("iron") ||
    msg.includes("hb") ||
    msg.includes("rbc")
  ) {
    return (
      "🔬 **Hemoglobin (Hb) Reference Ranges**:\n\n" +
      "• **Adult Males**: 13.8 to 17.2 g/dL\n" +
      "• **Adult Females**: 12.1 to 15.1 g/dL\n" +
      "• **Children**: Varies by age (typically 11.0 to 16.0 g/dL)\n\n" +
      "• **Low Hemoglobin (Anemia)**: Can cause fatigue, dizziness, pale skin, cold hands/feet, and shortness of breath. Iron-rich foods (spinach, lentils, lean meat) and medical evaluation are recommended."
    );
  }

  // 6. Medilink AI Risk Score Levels
  if (
    msg.includes("risk") ||
    msg.includes("routine") ||
    msg.includes("soon") ||
    msg.includes("immediate") ||
    msg.includes("score") ||
    msg.includes("prediction")
  ) {
    return (
      "🤖 **Medilink AI Health Risk Classification**:\n\n" +
      "Our diagnostic model analyzes 11+ clinical features (age, BP, glucose, hemoglobin, pre-existing conditions, lifestyle) to categorize your risk:\n\n" +
      "1. **Routine (Low Risk)**: Vitals and history are stable. Maintain healthy lifestyle habits and periodic annual checkups.\n" +
      "2. **Soon (Moderate Risk)**: Early warning indicators detected (e.g. pre-hypertension, borderline sugar, multiple mild conditions). Recommended to consult your doctor within 1–2 weeks.\n" +
      "3. **Immediate (High/Urgent Risk)**: Critical vitals detected (e.g. hypertensive crisis or acute diabetic instability). Immediate physician evaluation is required."
    );
  }

  // 7. Medilink Platform Guidance (Prescriptions, PDF, Doctor Lookup)
  if (
    msg.includes("how to") ||
    msg.includes("pdf") ||
    msg.includes("download") ||
    msg.includes("prescription") ||
    msg.includes("doctor lookup") ||
    msg.includes("upload") ||
    msg.includes("emergency pass")
  ) {
    return (
      "📋 **How to Use Medilink Tools**:\n\n" +
      "• **View Medical Records**: Click 'My Records' in your patient dashboard to see complete vitals, history, and uploaded prescriptions.\n" +
      "• **Download Summary PDF**: On the Patient Details page, click 'Download Summary PDF' to get an official, physician-ready report.\n" +
      "• **Upload Prescriptions**: When editing your profile, you can upload prescription photos which are automatically archived.\n" +
      "• **Doctor Emergency Access**: Licensed physicians can look up your record instantly using your registered mobile number."
    );
  }

  // 8. General Greetings
  if (
    msg === "hi" ||
    msg === "hello" ||
    msg === "hey" ||
    msg.startsWith("hi ") ||
    msg.startsWith("hello ") ||
    msg.includes("who are you") ||
    msg.includes("help")
  ) {
    return (
      "Hello! I am your **Medilink AI Health Assistant** 🩺\n\n" +
      "I can assist you with:\n" +
      "• Explaining Blood Pressure, Glucose, and Hemoglobin lab readings\n" +
      "• Clarifying your Medilink AI Health Risk evaluation (Routine, Soon, Immediate)\n" +
      "• Guidance on downloading health records and summary PDFs\n" +
      "• General wellness and preventative health tips\n\n" +
      "What question can I answer for you today?"
    );
  }

  // 9. Diet, Nutrition & Lifestyle
  if (
    msg.includes("diet") ||
    msg.includes("food") ||
    msg.includes("lifestyle") ||
    msg.includes("exercise") ||
    msg.includes("water") ||
    msg.includes("weight")
  ) {
    return (
      "🥗 **Cardiovascular & Metabolic Health Tips**:\n\n" +
      "• **DASH Diet Principles**: Emphasize vegetables, fruits, whole grains, lean proteins, and low-fat dairy while reducing sodium (< 2,300 mg/day).\n" +
      "• **Hydration**: Aim for 2–3 liters of water daily, depending on activity level.\n" +
      "• **Physical Activity**: At least 150 minutes of moderate aerobic exercise (brisk walking, swimming) per week.\n" +
      "• **Limit Stimulants**: Moderate caffeine and avoid smoking and excess alcohol to safeguard vascular elasticity."
    );
  }

  // 10. Default General Medical Assistant Response
  return (
    `Regarding "${rawMessage}":\n\n` +
    "For this health topic, normal ranges and treatments depend on your individual age, medical history, and current medications.\n\n" +
    "• **In Medilink**: You can review your vitals breakdown and run the AI Health Risk Assessment under the 'AI Health Risk' tab.\n" +
    "• **Physician Consultation**: Always consult your licensed healthcare provider before altering medications or treatment plans.\n" +
    "• If you are experiencing acute pain, dizziness, or difficulty breathing, please seek immediate emergency medical care."
  );
}

/**
 * Attempt to generate response using Google Gemini API.
 */
async function generateGeminiResponse(userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt =
    "You are Medilink Assistant, a helpful and empathetic clinical health information guide for the Medilink digital health records platform. " +
    "Provide clear, accurate, and easy-to-understand medical information in response to the user's inquiry. " +
    "Explain clinical terms, standard vital signs ranges, and healthy habits. " +
    "Do not provide a definitive medical diagnosis or prescribe medications. " +
    "Encourage consulting a licensed physician for personalized care. " +
    "If the user mentions life-threatening symptoms (e.g. acute chest pain, stroke signs, difficulty breathing), immediately emphasize seeking urgent emergency care.\n\n" +
    `User Inquiry: ${userMessage}`;

  // Try standard models with fallback
  const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash"];

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (modelErr) {
      console.warn(`Gemini model ${model} failed:`, modelErr?.message || modelErr);
    }
  }

  return null;
}

router.post("/", async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const trimmedMessage = message.trim();

    // 1. If GEMINI_API_KEY is configured, try Gemini first
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiReply = await generateGeminiResponse(trimmedMessage);
        if (geminiReply) {
          return res.status(200).json({
            success: true,
            reply: geminiReply,
            source: "gemini",
          });
        }
      } catch (geminiError) {
        console.warn("Gemini call failed, falling back to local medical engine:", geminiError?.message || geminiError);
      }
    }

    // 2. Seamless fallback to local medical & platform knowledge engine
    const localReply = getLocalMedicalResponse(trimmedMessage);
    return res.status(200).json({
      success: true,
      reply: localReply,
      source: "knowledge-base",
    });
  } catch (error) {
    console.error("Chat route error:", error?.message || error);
    // Even in error conditions, return a safe, graceful medical response rather than 500
    return res.status(200).json({
      success: true,
      reply:
        "I am currently operating in basic mode. For general medical questions, you can ask about normal blood pressure, blood glucose ranges, or Medilink AI risk categories.",
      source: "fallback",
    });
  }
});

export default router;
