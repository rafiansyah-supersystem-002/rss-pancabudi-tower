import { MOCK_USERS } from "./mock.data";
import type { UserData } from "./users-types";

export async function findUserByEmail(email: string): Promise<UserData | null> {
    return MOCK_USERS.find((u) => u.email === email) ?? null;
}

export async function findUserById(id: string): Promise<UserData | null> {
    return MOCK_USERS.find((u) => u.id === id) ?? null;
}
