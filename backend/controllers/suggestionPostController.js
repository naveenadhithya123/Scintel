import sequelize from "../config/database.js";

export const addSuggestion = async (req, res) => {
    try {
        const {
            type,
            title,
            description,
            category,
            proof_url,
            priority,
            user_id
        } = req.body;

        // 1. Validation check
        if (!type || !title || !description || !category || !priority || !user_id) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        // 2. Safety: Truncate proof_url to 255 chars 
        // A Base64 string (even for a 1MB file) is thousands of characters.
        // If your DB column is a STRING(255), the database will reject it.
        const safeProofUrl = proof_url ? proof_url.substring(0, 250) : "no-proof";

        // 3. MySQL Compatible Insert (Removed 'RETURNING *')
        await sequelize.query(`
            INSERT INTO suggestions 
            (type, title, description, category, proof_url, priority, date, user_id)
            VALUES 
            (:type, :title, :description, :category, :proof_url, :priority, CURRENT_DATE, :user_id)
        `, {
            replacements: {
                type,
                title,
                description,
                category,
                proof_url: safeProofUrl, 
                priority,
                user_id
            }
        });

        // 4. Success Response
        res.status(201).json({
            message: "Suggestion submitted successfully"
        });

    } catch (error) {
        // This will print the EXACT error to your terminal (e.g., "Data too long for column 'proof_url'")
        console.error("DATABASE ERROR:", error);

        res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        });
    }
};