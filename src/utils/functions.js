import uuid from 'uuid-random';

export const getValuesArray = (response) => {
  return response.data.values;
};

export const PRListToDropDown = (prlist) => {
  const formattedList = prlist.map((item) => {
    return { label: item.title, value: item.id };
  });
  return formattedList;
};

export const extractFiles = (text) => {
  const regex = /^diff --git a\/(.*?) b\/(.*?)(?:$|\n)/gm;
  const changedFiles = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    changedFiles.push(match[2]);
  }
  return changedFiles;
};

export const formatFileList = (fileArray) => {
  const tableRows = fileArray.map((item) => {
    return { // format for dynamic table ui rows
      key: uuid(),
      cells: [
        {
          key: uuid(),
          content: item,
        },
      ],
    }
  })
  return tableRows;
}