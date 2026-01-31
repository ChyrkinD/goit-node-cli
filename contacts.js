import fs from "node:fs/promises"
import { resolve } from "node:path"
import { nanoid } from "nanoid";


const contactsPath = resolve('data', 'contacts.json');

const updateContacts = async (data) => await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))

const isFileExists = async (path) => {
    try {
        await fs.access(path, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

export async function listContacts() {
    if (await isFileExists(contactsPath)) {
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data);
    } else {
        return [];
    }
}

export async function getContactById(contactId) {
    const data = await listContacts();
    if (data.length === 0) return null;
    const contact = data.find(item => item.id === contactId);
    return contact || null;
}

export async function removeContact(contactId) {
    const data = await listContacts();
    if (data.length === 0) return null;

    const index = data.findIndex(item => item.id === contactId);
    if (index === -1) return null;
    const [result] = data.splice(index, 1);
    await updateContacts(data);
    return result;
}

export async function addContact(name, email, phone) {
    let data = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    data.push(newContact);
    await updateContacts(data);
    return newContact;
}