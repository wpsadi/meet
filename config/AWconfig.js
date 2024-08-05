import {Client, Databases, Messaging} from "node-appwrite"


export const client = new Client()
.setEndpoint(process.env.AW_API_Endpoint) // Your API Endpoint
.setProject(process.env.AW_ProjectId) // Your project ID
.setKey(process.env.AW_API_Key ); // Your secret API key

export const db = new Databases(client)
export const msg = new Messaging(client) 