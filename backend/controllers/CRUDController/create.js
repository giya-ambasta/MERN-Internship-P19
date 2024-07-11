const create = async (Model, req, res) => {
    try {
        const userTypes = ["hallOwner", "catering", "photographer", "musician", "performer", "speaker", "decorator"];
        let requestData = { organizerId: req.User._id };

        for (const key in req.body) {
            if (userTypes.includes(key)) {
                const userTypeIndex = userTypes.indexOf(key);
                requestData[userTypes[userTypeIndex]] = { ['id']: req.body[key] };
            } else {
                requestData[key] = req.body[key];
            }
        }

        const fileData = { ...req.file };

        if (fileData.hasOwnProperty('path')) {
            requestData.profilePicPath = fileData.path;
        }

        const data = await Model.create(requestData);
        return res.status(201).json({
            success: true,
            result: data,
            message: 'Successfully Created the document in Model ',
        });
    }
    catch (error) {
        if (error.name == 'ValidationError') {
            return res.status(400).json({
                success: false,
                result: null,
                message: 'Required fields are not supplied',
                error: error,
            });
        } 
        else {
            // Server Error
            return res.status(500).json({
                success: false,
                result: null,
                message: error.message,
                error: error,
            });
        }
    }
};

module.exports = create;