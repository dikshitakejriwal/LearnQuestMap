
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { subject, hours, resources, goal } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(subject, hours, resources, goal),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(subject, hours, resources, goal) {
    return `Act as a tutor that creates study plan. You will provide with goal of student, their time commitment, and resource preferences. You will create a study plan with timelines and links to the resources. Only include relevant resources because my time is limited. My request - "Create a study plan for a student who want to learn ${subject}. The person can study ${hours} hours per week and only want ${resources} resources. The goal of the student is ${goal}. Please provide links of the resources"`;
}
