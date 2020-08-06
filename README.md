# TeamPySpark


 Link to dashboard (or link to video of dashboard demonstration)

 [Google Slides Presentation](https://docs.google.com/presentation/d/1_PMTb9D7JATLUvOpR_WDij9qfOgb7B80TdIEhfzbzYs/edit?usp=sharing)

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

# Technologies Used
## Data Cleaning and Analysis
Pandas will be used to clean the data and perform an exploratory analysis. Further analysis will be completed using Python.   We will also use simple exploratory functions in excel.

## Database Storage
SQL is the database we intend to use, utilizing PGAdmin and Postgres, and we have built an ERD and have joined several sources of data.  Finally, we will integrate Flask as a pipeline to display the data.

## Machine Learning
SciKitLearn is the ML library we'll be using to create a classifier. We plan to use unsupervised machine learning and potentially linear regression as our target is the elements that drive success, not the binary outcome of success.  Our training and testing setup is currently scaling, PCA and then classification using K-Means, but this may migrate to Random Forest or back to linear regression as we optimize our models.

## Dashboard
In addition to using a Flask template, HTML and CSS will be used for website design, using D3.js for a fully functioning and interactive dashboard, and javascript plotly for graphs. We may also use Tableau.  It will be hosted on Tableau Public or github, or another website if we are using javascript.  We are not decided on hosting yet.


### Result of analysis

### Recommendation for future analysis

### Anything the team would have done differently
