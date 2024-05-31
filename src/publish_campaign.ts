
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey";
import { createClient, createCampaign, eos, Session, type CreateCampaignArgs, jungle4 } from '@effectai/sdk';
import { input, select, password, confirm } from '@inquirer/prompts';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export const publish_template = async () => {

  const folderPath = path.join(__dirname, '../templates/');//
  const template_folders = await readdir(folderPath)
  const template_choices = template_folders.map((folder) => ({ title: folder, value: folder }))
  const selected_template = await select({
    choices: template_choices,
    message: "Select a template",
  })

  const chain = await select({
    message: "Select a network",
    choices: [
      { name: "EOS Mainnet", value: eos},
      { name : "Jungle Testnet", value: jungle4},
    ],
  })

  const actor = await input({
    message: "Enter your account name",
    validate: (value) => value.length > 0 && value.length < 13,
  })

  const permission = await input({
    message: "Enter your permission",
    validate: (value) => value.length > 0,
  })

  const private_key = await password({
    message: "Enter your private key",
    validate: (value) => value.length > 0,
  })

  const title = await input({
    message: "Enter the title for the campaign",
    validate: (value) => value.length > 0,
  })

  const confirm_wallet = await confirm({
    message: "Is everything correct?",
  })

  if (!confirm_wallet) {
    console.log("Please run the script again with the correct information.")
    process.exit(1)
  }

  const session = new Session({
    chain,
    actor,
    permission,
    walletPlugin: new WalletPluginPrivateKey(private_key),
  })

  const client = await createClient({ session })

  const campaignFile = await readFile(`templates/${selected_template}/index.html`, 'utf8')
  const exampleTask = await readFile(`templates/${selected_template}/example_task.json`, 'utf8')

  const campaignExample: CreateCampaignArgs = {
    client: client,
    campaign: {
      category: "Test",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      estimated_time: 1,
      example_task: exampleTask,
      image: "image",
      instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      // input_schema: await inputSchema.text(),
      input_schema: null,
      output_schema: null,
      template: campaignFile,
      title,
      version: 1,
      reward: 1,
      maxTaskTime: 1,
      // qualifications: [],
      qualitications: []

    },
  }

  const response = createCampaign(campaignExample)
  console.log(response)
}
