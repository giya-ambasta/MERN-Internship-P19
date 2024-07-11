const readAll = async (Model, req, res) => {
    try {
        const results = await Model.find({organizerId: req.User.id});
        if (!results) {
            return res.status(404).json({
                success: false,
                result: null,
                message: 'No documents found',
            });
        } else {
            return res.status(200).json({
                success: true,
                results,
                message: 'Found all documents',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            result: null,
            message: error.message,
            error: error,
        });
    }
};

module.exports = readAll;
