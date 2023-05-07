# StatBug

This Google Apps Script project fetches data from a Bugzilla instance and generates statistics such as the total number of bugs, number of bugs that are untriaged, and percentage of untriaged bugs. The statistics are then written to a Google Sheets spreadsheet.

## Setup

1. Create a new Google Sheets spreadsheet.

2. Open the script editor by selecting "Extensions" > "Apps Script" from the menu.

3. Copy and paste the code from the main.js file in this repository into the script editor.

4. Set up the script properties:

    a. Go to the "Project Settings" and scroll down to the "Script Properties" section.

    b. Add a property named "Bearer" with your Bugzilla API token as the value.

    c. Add a property named "total_bugs_url" with your Bugzilla query for total bugs,
       e.g: `https://bugzilla.redhat.com/rest/bug?bug_status=NEW&bug_status=ASSIGNED&component={COMPONENT}&product={PRODUCT}`
    
    d. Add a property named "untriaged_team_bugs_url" with your Bugzilla query for team's untriaged bugs,
       e.g: `https://bugzilla.redhat.com/rest/bug?bug_status=NEW&bug_status=ASSIGNED&component={COMPONENT}&product={PRODUCT}&query_format=advanced&v1=team_triaged%2B`

5. Save the script.

6. Run the fetchBugCountFromAPI function to fetch data from Bugzilla and write the statistics to the spreadsheet.

You can also choose when to trigger the script, e.g.: weekly, hourly, etc...
