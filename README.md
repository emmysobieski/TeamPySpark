# TeamPySpark

ReadMe Goals:

1. Cohesive, structured outline of the project (this may include images, but they should be easy to follow and digest)

2. Link to dashboard (or link to video of dashboard demonstration)

3. Link to Google Slides presentation

Selected topic
# Microloans from the customer perspective

### reason topic was selected
### Microloans are an important tool to help small entrepreneurs launch businesses.  
Today income inequality is the worst in decades.  We have seen this in the US and globally where the rich get richer, the poor struggle more and the middle class of many societies is hollowed out.  

### Description of the source of data:

Kiva.org connects lenders and borrowers of microloans globally, and they have 3 CSVs for download: one with the loan data (the borrower's application stats), one with the lender data (how many loans they give out, dollar amounts), and one that is two columns that connects loans and lenders, ie connects the two other CSVs with identifying information.

### Questions the team hopes to answer with the data

Often when analysts look at microloans, the lens and argument is that even though the loans are small and for those who do not have means, the repayment rates are quite attractive, in that few of these loans default.  So analysis has centered on looking at what defaults, avoiding defaults and predicting the best loans to make.  All this analysis is from the perspective of the LENDER.

Given that the idea of microloans is to help those without means use entrepreneurship and small loans to catapult themselves out of poverty, we wanted to look at the FACTORS that make a loan application successful, in that they get a loan and the loan is then repaid, thus the business application was successful.  If we can use regression analysis to identify the most important factors that lead to a client being successful, we can create a visualization and app so they can see what they might change in order to raise their chances of success in both getting the loan and having the business be successful.

### Description of the data exploration phase of the project

These CSVs are very large and have many blank cells, so data exploration involved moving large files to github, acccessing files using dataframe head() function to see the structure and start working to reduce the complexity and size of the data without losing any key predictive values.

### Description of the analysis phase of the project

Normally for lending questions, it would be a binary classification challenge.  We look at it from the perspective of the borrower, ie what are the components of the application and business that led the loan to be succesful?  Thus we use regression analysis to see which elements of the application drive the most likelihood of success.

Using regression analysis does create one challenge: what is the Y variable?  If all the loans in the Kiva.org data are actual loans, how can we define success.  We are looking at %funded vs goal, number of lenders a project attracts, and the dollar per lender as measures that lenders on the platform found that loan attractive and thus more likely to receive funding.

### Technologies, languages, tools, and algorithms used throughout the project

Github, Jupyter notebook, pandas, SQL, Postgres, PGAdmin, QuickDBD, Scikitlearn

### Result of analysis

### Recommendation for future analysis

### Anything the team would have done differently
