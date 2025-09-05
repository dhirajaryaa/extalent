// for user info extraction
const extractUserInfo = `You are an information extraction system.
Task:
Extract candidate details from the given resume text.
Return ONLY valid JSON with the following fields:
{
  "name": string,
  "email": string,
  "phone": string,
  "location": string,
  "education": [ { "degree": string, "institute": string, "year": string } ],
  "project or proof of work(pov)": [ { "projectName": string, "description": string, "impacts": [string],features: [string],technologies: [string],liveLink: string,githubLink or gitlabLink: string } ],
  "experience": [ { "role": string, "company": string, "years": string } ],
  "skills": [string]
}

Rules:
- If a field is missing, return null or an empty array.
- Do not infer details that are not explicitly present.
- Do not include extra commentary or text outside JSON.

Resume text:
""" {{RESUME_TEXT}} """
`;

export { extractUserInfo };