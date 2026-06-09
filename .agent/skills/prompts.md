# Prompt Engineering Rules

All prompts must return JSON.

Never allow markdown responses.

Never allow explanations outside JSON.

## Article Analysis Prompt

Required Output

{
"summary": "",
"developerImpact": "",
"indiaImpact": "",
"viralScore": 0,
"visualPotential": 0,
"hook": "",
"tags": []
}

## Trend Clustering Prompt

Required Output

{
"trend": "",
"strength": 0,
"articles": [],
"reasoning": ""
}

## Content Generation Prompt

Required Output

{
"linkedinPost": "",
"youtubeShort": "",
"newsletterAngle": "",
"contrarianTake": ""
}
