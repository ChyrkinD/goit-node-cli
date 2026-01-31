import { listContacts, addContact, removeContact, getContactById } from "./contacts.js";
import { program } from "commander";

const invokeAction = async ({ action, id, ...data }) => {
    switch (action) {
        case 'list':
            const contacts = await listContacts();
            if (contacts.length !== 0) return console.table(contacts);
            return console.log('You don\'t have contacts yet.');
        case 'get':
            return console.table(await getContactById(id));
        case 'add':
            const { name, email, phone } = data
            return console.table(await addContact(name, email, phone));
        case 'remove':
            return console.table(await removeContact(id));
        default:
            console.log('Unknown action');
    }
}

program
    .option('-a, --action <type>')
    .option('-n, --name <type>')
    .option('-p, --phone <type>')
    .option('-i, --id <type>')
    .option('-e, --email <type>');
program.parse();

const options = program.opts()
invokeAction(options);