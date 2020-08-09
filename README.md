# TeamPySpark

![Website Landing Page Image](Misc/LP.png)
 
Link to dashboard (or link to video of dashboard demonstration)

 [Google Slides Presentation](https://docs.google.com/presentation/d/1_PMTb9D7JATLUvOpR_WDij9qfOgb7B80TdIEhfzbzYs/edit?usp=sharing)

Selected topic
## Microloans from the loan recipient's perspective

#### Why microlending?
Microlending has been a game changing way to address international poverty, social equity, and lack of educational parity.  Kiva, started in 2005 by a young couple, launched a new strategy to effect social impact through microlending: focus on the progress of the people rather than the situational poverty.  This landmark mindshift catalyzed a social movement where all people, everywhere are empowered to give opportunities to the world's most oppressed individuals at an unimaginable scale -- providing loans of more than $1 Billion dollars to date in 99 countries.

#### Microloans are an important tool to help small entrepreneurs launch businesses.  
Today income inequality is the worst in decades.  We have seen this in the US and globally where the rich get richer, the poor struggle more and the middle class of many societies is hollowed out.  

#### Data utilized to complete the analysis:
Kiva.org provides robust snapshot data from their database semi-regularly. The snapshot includes three databases:

      * Loans: which describes the individual loan
      * Lenders: which contains details about the lenders who bolster the community
      * Loans_lenders: which includes information about the individual ventures that are funded including country, descriptions, tags and categories, and relevant funding information.
      * Additional relevant data was discovered on Kaggle about Kiva loan locations.
      * Additionally, the PySpark team sought out a datasource from the United Nations which provides an array of critical metrics about the countries where these loans are issued.

#### Questions the team hopes to answer with the data
Often when analysts look at microloans, the lens and argument is that even though the loans are small and for those who do not have means, the repayment rates are quite attractive, in that few of these loans default.  So analysis has centered on looking at what defaults, avoiding defaults and predicting the best loans to make.  All this analysis is from the perspective of the LENDER.

Given that the idea of microloans is to help those without means use entrepreneurship and small loans to catapult themselves out of poverty, we wanted to look at the FACTORS that make a loan application successful, in that they get a loan and the loan is then repaid, thus the business application was successful.  If we can use regression analysis to identify the most important factors that lead to a client being successful, we can create a visualization and app so they can see what they might change in order to raise their chances of success in both getting the loan and having the business be successful.

#### Description of the data exploration phase of the project
Through the data exploration pre-processing steps, the team examined how the databases interconnected through entity relationship diagrams.  Additionally field values were unlocked and mapped to their column names. Columns with an overwhelming amount of null data were accessed for their feasibility in the data examination.  Signs with multiple string values that could be reassigned to categorial groups for ease in analysis were cleaned with functions that made the data easier to manipulate for use in machine learning tools.  Additionally, a column was added to the dataset that found the difference in time between two separate date columns to identify time to funding -- a data value that became critical to the machine learning framework that was used. 

#### Specific Steps in Machine Learning Data Preprocessing:

Import dependencies needed for data preprocessing, then:

1. Explore column names to decide which may be un-necessary columns

2. Create Y target.  Most loans are funded, so removed the few unfunded loans and defined success by calculating speed of funding of loan (elapsed time calculation).  Ran a distribution (it is skewed, so need to resample below), with mean at 12 days, so defined a binary classification for y of 12 days.  Less than 12 days is a successful funding experience for the borrower.  This becomes 1 in the dataframe, and 0 is unsuccessful in that it takes more than 12 days and has a long tailed distribution, so can take up to a year or more.  The FIRST issue is that 69% of the data was in the 1 category, so needs to be resampled. The SECOND ISSUE is that under or over 12 days is very binary at that mark.  For example one second over 12 days is a failure, but one second below 12 days is a success.  We tried to deal with this by re-bucketing into 5 weekly buckets.

3. Bucketing time to funding in first week, second week, third week, fourth week, and 5th week and beyond.  The issue was that 50% of the data was in the 1 category, but ALSO the second largest chunk of data was in the 5 category, capturing the long tail of the distribution and lumping it together.  Every model we ran with this had the highest prediction success where the data was located, in 1 and 5, and overall model performance using this bucketing, even with resampling techniques, resulted in model performance from 40-45%.  The issue appears to be that with hand-sampling the data, it makes it harder for Random Oversampling or other resampling techniques to be effective, compared with sampling from two larger buckets above.

4. Transform Gender.  Gender was one column of strings like male, female, female, female, male in all different combinations.  We transformed into a male column and female column where it counts the number of males or females in a column.  Then you read across both columns in a given row to see the total number of males and females.  We found a predominance of women borrowers, with 1.3 million count in either all women teams or women solo borrowers, vs 362 thousand males in either solo or all-male teams.

5. Remove un-necessary or repetitive columns from the dataframe.

6. Sent "TAGS" column which is full of hashtags like #women-owned to a dataframe and then a CSV for exploration using NLP and word clouds.

7. Sampled data at 5% of the total because original file is 1.8 million rows even after all the eliminations.

8. Removed null and NaaN values by row.

9. Export the cleaned dataframe into a csv for easy importing into the machine learning notebook.  Datapreprocessing and machine learning notebooks are separate for easier recomputation.


#### Description of the analysis phase of the project
Normally for lending questions, it would be a binary classification challenge.  We look at it from the perspective of the borrower, ie what are the components of the application and business that led the loan to be succesful?  Thus we use regression analysis to see which elements of the application drive the most likelihood of success.

Using regression analysis does create one challenge: what is the Y variable?  If all the loans in the Kiva.org data are actual loans, how can we define success.  We are looking at %funded vs goal, number of lenders a project attracts, and the dollar per lender as measures that lenders on the platform found that loan attractive and thus more likely to receive funding.

* Multiple machine learning models were examined using two parallel structures: a binary outcome, and a multifactorial outcome with six bucketed categories
* The models used in order to effect the best outcome include: 

      Linear Regression
      Logistic Regression
      Support Vector Machines with Linear and Radical Basis Kernels
      Random Forest


#### Specific Steps in Machine Learning Modeling:

1. Import the dependencies needed for scaling, PCA, machine learning, and model evaluation

2. Import the clean dataframe via CSV upload, from the final dataframe CSV created in the end of the preprocessing notebook.

3. Drop the Y value from the dataframe so we can predict it.

4. Encode X with Get Dummies

5. Perform the Train/Test Split using train_test_split(X,y, random_state=1, stratify=y)

6. Scale X_train and X_test

7. Sampling: Random Oversampling had the best result for the least performance hit.  
We tried Random Oversampling, SMOTE, Random Undersampling, Cluster Centroid, and Resampling using SMOTEEN on both binary classification and multiple classification datasets.

8. PCA: we ran PCA on binary classification and multiple classification.
We found that all dimension are fairly equally important, such that there was a linear relationship between the explainability and number of dimensions used.  Thus PCA was not helpful to reduce dimentionality.  This was the case with both classifications.

9. LOGISTIC REGRESSION: Solid performance out of the gate at average of 69% precision, 67% recall, and f1 of 68%. We used random oversampled (ROS) data in the model, but it really didn't make a difference in the performance.  This could be an issue because 69% of the data is in the 1 category naturally, so we used the oversampled data to be sure we re-distributed the data so the accuracy was more trustworthy than just the same chance of the data being where it predicts.

![Statistical Analysis of Logistic Regression using Binary Classification:](https://github.com/emmysobieski/TeamPySpark/blob/Emmy/LogisticRegressionAnalysis.png)

From the above statistics you can see________________________________

10. RANDOM FOREST - Binary Classification: We used ROS inputs and then tuned on the following parameters: n-estimates (50, 100, 200), max depth (originally set at 5, removed it and added 5-6 percentage points to the balanced accuracy, precision, recall and f1 scores.  This model started out less predictive than logistic, but once tuned, came out ahead, at 68.7% balanced accuracy (came in as high as 70.2 once with a different sample taken of the original dataset - because we only take 5% there is some variability), and 69% precision, 69% recall, and 69% f1.

![Statistical Analysis of Random Forest Model using Binary Classification](https://github.com/emmysobieski/TeamPySpark/blob/Emmy/RandomForest.png)

From the above statistics you can see________________________________

FAILED MODELS:

11. LINEAR REGRESSION: Enourmous means squared error of -1.29e23 which is -349.59.  We DROPPED this model from our final notebook as linear regression does not appear to lend itself to this data.  

12. SUPPORT VECTOR MACHINES (SVMs): SVMs using SVC library.  Both using the binary and multiple (bucketed) classification datasets, SVMs came in 62-63% accuracy for the binary classification and even less for multiple classification data and took 30 minutes to multiple hours to complete. We DROPPED this model from out final notebook.

13. RANDOM FOREST - Multiple classification:  We used ROS inputs and then tuned on the following parameters: n-estimates (50, 100, 200), max depth (originally set at 5, removed it and added 5-6 percentage points to the balanced accuracy, precision, recall and f1 scores. Bucketing hurt the model performance.  Our thesis is that by hand "distributing" the data in equal weeks, up to week 5, then the entire tail of the data in week 5, we made it more difficult to resample the data as it was bar-belled in two buckets, the first and the last.  The result was model performance of 40-45%, even after tuning the model extensively as described in the first part of this paragraph.

14. NEURAL NETS: We did not run neural nets as (1) We were wanting to understand components that were important to the speed of getting a loan funded, so could not use multiple layers in a neural net and get this information.  (2) If we used one layer in a neural net, this is very close to how a SVM acts, so we used the SVM instead.

15. MODEL PERFORMANCE MEASUREMENT: When we were using oversampling, we used imbalanced classification report and balanced accuracy score to take into account we were using resampled data.  

16. CONCLUSION: We were able to see a large variance and improvement in model performance with (1) cleaning and re-sampling data, (2) data selection between binary or multiple classification of y, (3) along with model tuning, and (4) Model selection.  Because these microloans are from all over the world, and because most are pre-funded, there is likely important pieces of data missing from the original dataset, such as back-door relationships with large foundations who help the underpriveledged, groups that help bring some of these borrowers through the process, and the always present but hard to measure human factor of personal networking.  This missing data is likely why our models struggled to surpass 70% accuracy, though we did select the ones with the most balance.  Finally, because all these loans fund, and thus we were measuring speed of funding, that speed may have to do with other external forces that we are not aware of, that is not in the data, such as certain regions or funders being faster or slower, no matter who the borrower is or what the loan is for.

## Technological Components

#### Technologies, languages, tools, and algorithms used throughout the project:

    * Python and Pandas libraries used for data manipulation and exploration 
    * Plotly, Matplotlib, Google Charts for visualizations 
    * D3, JavaScript and HTML for dashboard creation 
    * PostgresSQL in PGAdmin for data storage and joining databases
    * HTML, CSS and JavaScript for interactive web presentation
    * Google Colab for running machine learning algorithms with NLP using PySpark
    * PCA, SciKitLearn, IMBLearn, Tensorflow executed in Jupyter Notebooks
    * Google slides for presentation

#### Data Cleaning and Analysis
Pandas will be used to clean the data and perform an exploratory analysis. Further analysis will be completed using Python.   We will also use simple exploratory functions in excel.

#### Database Storage
SQL is the database we intend to use, utilizing PGAdmin and Postgres, and we have built an ERD and have joined several sources of data. A connection string has been established in a notebook file to connect the data back into pgAdmin to accessed. 

#### Machine Learning
SciKitLearn is the ML library we'll be using to create a classifier. We plan to use unsupervised machine learning and potentially linear regression as our target is the elements that drive success, not the binary outcome of success.  Our training and testing setup is currently scaling, PCA and then classification using K-Means, but this may migrate to Random Forest or back to linear regression as we optimize our models.

#### Dashboard
Bootstrap tools are integrated with JavaScipt code to create a website that will communicate project results and impact.  Interactive tools that rely on D3 selectors will empower site visitors to browse the variety of portfolios of exprience that lenders have with as part of the Kiva community.   will be used for website design, using D3.js for a fully functioning and interactive dashboard, and javascript plotly for graphs. 

## Analytical outcomes and future analysis

#### Result of analysis

#### Recommendation for future analysis

#### Anything the team would have done differently

## Communication Protocols 
The team was in continuous collaboration and communicaution using a dedicated Slack channel.  Beyond meeting in class as a full team, all members also joined a regular Monday meeting that lasted for an hour to touch base on project details and continue forward movement.  Daily Zoom calls between team members took place to collaborate on various project components, assignment of activities, and project idea generation.  

## References

