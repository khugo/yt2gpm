export const getVideoTitle = async () => {
  const tab = await getActiveTab();
  const title = tab.title;
  const re = /(.*) - YouTube/;
  const match = re.exec(title);
  if (match) {
    return match[1];
  } else {
    console.warn(`Failed to parse video title from tab title ${title}`);
    return title;
  }
};

export const getVideoUrl = async () => {
  const tab = await getActiveTab();
  return tab.url;
};

const getActiveTab = () => {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      resolve(tabs[0]);
    });
  });
};