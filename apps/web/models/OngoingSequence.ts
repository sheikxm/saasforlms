import { OngoingSequence } from "@courselit/common-models";
import mongoose, { Schema } from "mongoose";

const OngoingSequenceSchema: Schema = new Schema<
    OngoingSequence & { domain: mongoose.Schema.Types.ObjectId }
>({
    domain: { type: mongoose.Schema.Types.ObjectId, required: true },
    sequenceId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    nextEmailId: { type: String },
    nextEmailScheduledTime: { type: Number, required: true },
    retryCount: { type: Number, required: true, default: 0 },
});

export default mongoose.models.OngoingSequence ||
    mongoose.model("OngoingSequence", OngoingSequenceSchema);
