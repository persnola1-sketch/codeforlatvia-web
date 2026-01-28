// Simple moderation filter scaffold
// Usage: import and call filterAndQueue(comments)
// NOTE: This is a scaffold. It will not run until you integrate it into /api/fetch-comments.

const profanityList = ['examplebadword1','examplebadword2']; // replace with real list

function looksSuspicious(text) {
  const low = text.toLowerCase();
  for (const p of profanityList) {
    if (low.includes(p)) return true;
  }
  // heuristic: too many links or repeated chars
  if ((text.match(/https?:\/\//g)||[]).length > 2) return true;
  if (/(.)\1{6,}/.test(text)) return true;
  return false;
}

async function filterAndQueue(dbClient, comment) {
  // dbClient: supabase or any postgres client
  const flag = looksSuspicious(comment.text);
  if (flag) {
    // insert into moderation_queue
    await dbClient.from('moderation_queue').insert([{comment_id: comment.id, reason: 'automated_filter', excerpt: comment.text.substring(0,200)}]);
    // optional: write to local file (Mia Space) if allowed
  }
  return flag;
}

module.exports = { looksSuspicious, filterAndQueue };
