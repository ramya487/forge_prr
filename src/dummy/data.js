export const data = [
  [
    "Issue: Incorrect validation for phone no.",
    "Change Yup.number() to Yup.string(), and implement custom function for validating phone numbers using regex.",
    6,
    "High",
  ],
  [
    "Suggestion: Use Date object instead of a string for date field in the schema.",
    'Replace `Yup.date().max(new Date(), "Invalid date").required("Date of joining required")` with `Yup.date().required("Date of joining required")`, and update the date value accordingly while setting it.',
    7,
    "Medium",
  ],
];

export const data2 = [
  {
      "fileName": "src/app/schema/yupSchema.ts",
      "issue": "Issue: Incorrect validation for phone no.",
      "fix": "Change Yup.number() to Yup.string(), and implement custom function for validating phone numbers using regex.",
      "line": 6,
      "category": "High"
  },
  {
      "fileName": "src/app/schema/yupSchema.ts",
      "issue": "Suggestion: Use Date object instead of a string for date field in the schema.",
      "fix": "Replace `Yup.date().max(new Date(), \"Invalid date\").required(\"Date of joining required\")` with `Yup.date().required(\"Date of joining required\")`, and update the date value accordingly while setting it.",
      "line": 7,
      "category": "Medium"
  },
  {
      "fileName": "src/app/schema/yupSchema.ts",
      "issue": "Issue: Incorrect validation for phone no.",
      "fix": "Change Yup.number() to Yup.string(), and implement custom function for validating phone numbers using regex.",
      "line": 6,
      "category": "High"
  },
  {
      "fileName": "src/app/schema/yupSchema.ts",
      "issue": "Suggestion: Use Date object instead of a string for date field in the schema.",
      "fix": "Replace `Yup.date().max(new Date(), \"Invalid date\").required(\"Date of joining required\")` with `Yup.date().required(\"Date of joining required\")`, and update the date value accordingly while setting it.",
      "line": 7,
      "category": "Medium"
  }
]

export const data3 = {
  "issues": [
    {
      "issue": "The code does not handle error cases for date validation",
      "solution": "You can use custom validation functions or libraries like moment.js to handle invalid dates",
      "line": "7",
      "category": "High"
    },
    {
      "issue": "There is a comment suggesting that phone number validation needs correction, but no further details are provided",
      "solution": "Provide a more specific solution or clarify the issue in the code comments",
      "line": "4",
      "category": "Medium"
    },
    {
      "issue": "No explicit validation for negative number or non-numeric values is provided for phone number field",
      "solution": "Add validation to check for negative numbers and non-numeric values for the phone number field",
      "line": "5",
      "category": "Low"
    }
  ]
}

