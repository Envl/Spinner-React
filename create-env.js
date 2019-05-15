const fs = require('fs')
fs.writeFileSync(
  './.env',
  `
ApiKey=${process.env.ApiKey}\n
AuthDomain=${process.env.AuthDomain}\n
DatabaseURL=${process.env.DatabaseURL}\n
ProjectId=${process.env.ProjectId}\n
StorageBucket=${process.env.StorageBucket}\n
MessagingSenderId=${process.env.MessagingSenderId}\n
`
)
