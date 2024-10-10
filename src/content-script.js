async function searchXiaohongshu(query) {
  // Navigate to the search page
  window.location.href = `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(query)}`;

  // Wait for the search results to load
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Extract search results
  const results = [];
  const noteCards = document.querySelectorAll('.note-item');

  for (const card of noteCards) {
    const title = card.querySelector('.title')?.textContent.trim();
    const link = card.querySelector('a')?.href;

    if (title && link) {
      results.push({ title, link, comments: [] });
    }
  }

  // Fetch comments for each result
  for (const result of results) {
    await fetchComments(result);
  }

  return results;
}

async function fetchComments(result) {
  // Navigate to the note page
  window.location.href = result.link;

  // Wait for the page to load
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Extract comments
  const commentElements = document.querySelectorAll('.comment-item');
  result.comments = Array.from(commentElements).map(el => el.textContent.trim());
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'search') {
    searchXiaohongshu(request.query).then(sendResponse);
    return true; // Indicates that the response will be sent asynchronously
  }
});