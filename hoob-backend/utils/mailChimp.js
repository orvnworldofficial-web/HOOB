import mailchimp from "@mailchimp/mailchimp_marketing";
import Contact from "../models/Contact.js";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

/**
 * Add subscriber to Mailchimp & MongoDB with tags
 */
export const addToAudience = async (email, mergeFields = {}, tags = []) => {
  try {
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;

    // Save in MongoDB
    const contact = await Contact.findOneAndUpdate(
      { email },
      { $set: { email, ...mergeFields }, $addToSet: { tags: { $each: tags } } },
      { upsert: true, new: true }
    );

    // Add to Mailchimp
    const subscriberHash = Buffer.from(email.toLowerCase()).toString("hex");
    await mailchimp.lists.setListMember(listId, subscriberHash, {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: mergeFields,
    });

    // Apply tags
    if (tags.length > 0) {
      await mailchimp.lists.updateListMemberTags(listId, subscriberHash, {
        tags: tags.map((t) => ({ name: t, status: "active" })),
      });
    }

    return { success: true, contact };
  } catch (err) {
    console.error("Mailchimp error:", err.response?.body || err.message);
    throw new Error("Failed to add subscriber");
  }
};
