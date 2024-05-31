import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { createClient, createCampaign, eos, Session, type CreateCampaignArgs } from '@effectai/sdk';
import { readdir } from 'node:fs/promises';

const files = await readdir("./templates/")
let indx = 0
for (const file of files) {
  console.log(`${indx++}: ${file}`)
}
console.write(`Choose a template: \n>`)

let folder_index = 0
for await (const line of console) {
  folder_index = parseInt(line)
  console.log(`You chose: ${line}`)
  break
}
let folder = files[folder_index]

const campaignFile = Bun.file(`templates/${folder}/index.html`)
const inputSchema = Bun.file(`templates/${folder}/input_schema.json`)
const exampleTask = Bun.file(`templates/${folder}/example_task.json`)

const session = new Session({
  chain: eos,
  actor: "your_account",
  permission: "your_permission",
  walletPlugin: new WalletPluginPrivateKey("your_private_key"),
})

const client = await createClient({ session })

const campaignExample: CreateCampaignArgs = {
  client: client,
  campaign: {
    category: "category",
    description: "Description for this Campaign",
    estimated_time: 1,
    example_task: exampleTask.toString(),
    image: "image",
    instructions: "Instructions for this Camapign",
    input_schema: null,
    output_schema: null,
    template: campaignFile.toString(),
    title: "Title for this Campaign",
    version: 1,
    reward: 1,
    maxTaskTime: 1,
    qualitications: [],
  },
}

const response = createCampaign(campaign)
console.debug(response)
