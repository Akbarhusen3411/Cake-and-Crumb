# Google Sheets Review System Setup

This connects the review form on your website to a Google Sheet so customer reviews (with photos) are saved and displayed automatically.

## Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it "Cake & Crumb Reviews"
3. In **Row 1**, add these headers exactly:

| A | B | C | D | E |
|---|---|---|---|---|
| name | rating | text | date | photo |

4. Click cell A1, type `name`, press Tab, type `rating`, press Tab, type `text`, press Tab, type `date`, press Tab, type `photo`

## Step 2: Add Apps Script

1. In your Google Sheet, click **Extensions > Apps Script**
2. Delete any existing code and paste this:

```javascript
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();
  var reviews = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][1] && data[i][2]) {
      reviews.push({
        name: data[i][0],
        rating: data[i][1],
        text: data[i][2],
        date: data[i][3],
        photo: data[i][4] || ''
      });
    }
  }
  return ContentService.createTextOutput(JSON.stringify(reviews))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = JSON.parse(e.postData.contents);

  var photoUrl = '';
  if (data.photo) {
    try {
      var blob = Utilities.newBlob(Utilities.base64Decode(data.photo), 'image/jpeg', 'review_' + Date.now() + '.jpg');
      var folder = getDriveFolder();
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
      photoUrl = 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w800';
    } catch (err) {
      photoUrl = '';
    }
  }

  sheet.appendRow([
    data.name,
    data.rating,
    data.text,
    data.date || new Date().toISOString(),
    photoUrl
  ]);

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getDriveFolder() {
  var folderName = 'Cake & Crumb Reviews Photos';
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}
```

3. Click **Save** (Ctrl+S)

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Set:
   - **Description:** Reviews API
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts (choose your Google account, click "Advanced" > "Go to ... (unsafe)" > "Allow")
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfyc.../exec`)

**If you get the redirect loop error:** Open an **incognito window** (Ctrl+Shift+N), log in with only one Google account, and deploy from there.

## Step 4: Add URL to Website

Open `src/config/googleSheetReviews.js` and paste your URL:

```javascript
export const REVIEWS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec'
```

## Done!

- **Review link to share with customers:** `https://akbarhusen3411.github.io/Cake-and-Crumb/#/review`
- Customer photos are saved in a Google Drive folder called "Cake & Crumb Reviews Photos" (auto-created)
- Customer reviews with photos will appear on the Reviews page automatically
- You can delete spam reviews directly from the Google Sheet
- To remove a review photo: delete the URL from column E in the sheet
