import ApiTokens from "../models/tokens";

const verifyToken = async (session: string) => {
    if (!session) {
        return false;
    }

    const token = await ApiTokens.findOne({ where: { token: session } });

    if (!token) {
        return false;
    }

    return true
}

export default verifyToken