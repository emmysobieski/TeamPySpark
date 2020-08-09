--Creating table for UN_country_variables 
CREATE TABLE country_profile_variables (
	Country VARCHAR NOT NULL,
	Region VARCHAR NOT NULL,
	Surface_area INT NOT NULL,
	Population_in_thousands_2017 FLOAT NOT NULL,
	Population_density_per_km2_2017 FLOAT NOT NULL,
	Sex_ratio_m_per_100_f_2017 FLOAT NOT NULL,
	Gross_domestic_product_million_current_US$ FLOAT NOT NULL,
	GDP_growth_rate_annual_percentage_const_2005_prices FLOAT NOT NULL,
	GDP_per_capita_current_US$ FLOAT NOT NULL,
	Economy_Agriculture_percent_of_GVA FLOAT NOT NULL,
	Economy_Industry_percent_of_GVA FLOAT NOT NULL,
	Economy_Services_and_other_activity_percent_of_GVA FLOAT NULL,
	Employment_Agriculture_percent_of_employed FLOAT NOT NULL,
	Employment_Industry_percent_of_employed FLOAT NOT NULL,
	Employment_Services_percent_of_employed FLOAT NOT NULL,
	Unemployment_percent_of_labour_force FLOAT NOT NULL,
	Agricultural_production_index FLOAT NOT NULL,
	Food_production_index FLOAT NOT NULL,
	International_trade_Exports_million_US$ FLOAT NOT NULL,
	International_trade_Imports_million_US$ FLOAT NOT NULL,
	International_trade_Balance_million_US$ FLOAT NOT NULL,
	Balance_of_payments_current_account_million_US$ FLOAT NOT NULL,
	Population_growth_rate_average_annual_percent FLOAT NOT NULL,
	Urban_population_percent_of_total_population FLOAT NOT NULL,
	Urban_population_growth_rate_average_annual_percent FLOAT NOT NULL,
	Fertility_rate_total_live_births_per_woman FLOAT NOT NULL
	

);
	
SELECT * FROM country_profile_variables;

--Creating table for kiva_country_variables 
CREATE TABLE kiva_country_profile_variables (
	Country VARCHAR NOT NULL,
	Region VARCHAR NOT NULL,
	Surface_area INT NOT NULL,
	Population_in_thousands_2017 FLOAT NOT NULL,
	Population_density_per_km2_2017 FLOAT NOT NULL,
	Sex_ratio_m_per_100_f_2017 FLOAT NOT NULL,
	Gross_domestic_product_million_current_US$ FLOAT NOT NULL,
	GDP_growth_rate_annual_percentage_const_2005_prices FLOAT NOT NULL,
	GDP_per_capita_current_US$ FLOAT NOT NULL,
	Economy_Agriculture_percent_of_GVA FLOAT NOT NULL,
	Economy_Industry_percent_of_GVA FLOAT NOT NULL,
	Economy_Services_and_other_activity_percent_of_GVA FLOAT NULL,
	Employment_Agriculture_percent_of_employed FLOAT NOT NULL,
	Employment_Industry_percent_of_employed FLOAT NOT NULL,
	Employment_Services_percent_of_employed FLOAT NOT NULL,
	Unemployment_percent_of_labour_force FLOAT NOT NULL,
	Agricultural_production_index FLOAT NOT NULL,
	Food_production_index FLOAT NOT NULL,
	International_trade_Exports_million_US$ FLOAT NOT NULL,
	International_trade_Imports_million_US$ FLOAT NOT NULL,
	International_trade_Balance_million_US$ FLOAT NOT NULL,
	Balance_of_payments_current_account_million_US$ FLOAT NOT NULL,
	Population_growth_rate_average_annual_percent FLOAT NOT NULL,
	Urban_population_percent_of_total_population FLOAT NOT NULL,
	Urban_population_growth_rate_average_annual_percent FLOAT NOT NULL,
	Fertility_rate_total_live_births_per_woman FLOAT NOT NULL
	

);
SELECT * FROM kiva_country_profile_variables;

--Changing UN data column names 
ALTER TABLE country_profile_variables RENAME COLUMN Sex_ratio_m_per_100_f_2017 TO UN_Sex_Ratio_m_per_100_f;
ALTER TABLE country_profile_variables RENAME COLUMN Gross_domestic_product_million_current_US$ TO UN_Gross_domestic_product_million_current_US$;
ALTER TABLE country_profile_variables RENAME COLUMN Fertility_rate_total_live_births_per_woman TO UN_Fertility_rate_total_live_births_per_woman;
ALTER TABLE country_profile_variables RENAME COLUMN Population_density_per_km2_2017 TO UN_Population_density_per_km2_2017;




--join 2 tables together 
SELECT kc.Country,
kc.Region,
kc.Surface_area, 
kc.Population_in_thousands_2017, 
kc.Population_density_per_km2_2017, 
kc.Sex_ratio_m_per_100_f_2017, 
kc.Gross_domestic_product_million_current_US$, 
kc.GDP_growth_rate_annual_percentage_const_2005_prices, 
kc.GDP_per_capita_current_US$, 
kc.Economy_Agriculture_percent_of_GVA, 
kc.Economy_Industry_percent_of_GVA, 
kc.Economy_Services_and_other_activity_percent_of_GVA, 
kc.Employment_Agriculture_percent_of_employed, 
kc.Employment_Industry_percent_of_employed, 
kc.Employment_Services_percent_of_employed, 
kc.Unemployment_percent_of_labour_force, 
kc.Agricultural_production_index, 
kc.Food_production_index, 
kc.International_trade_Exports_million_US$, 
kc.International_trade_Imports_million_US$,
kc.International_trade_Balance_million_US$, 
kc.Balance_of_payments_current_account_million_US$, 
kc.Population_growth_rate_average_annual_percent, 
kc.Urban_population_percent_of_total_population, 
kc.Urban_population_growth_rate_average_annual_percent, 
kc.Fertility_rate_total_live_births_per_woman,
cv.UN_Population_density_per_km2_2017,
cv.UN_Sex_Ratio_m_per_100_f,
cv.UN_Gross_domestic_product_million_current_US$,
cv.UN_Fertility_rate_total_live_births_per_woman
INTO Joined_Country_Profiles_Data
FROM kiva_country_profile_variables as kc
	LEFT JOIN country_profile_variables as cv 
		ON kc.Country = cv.Country
	

SELECT * FROM Joined_Country_Profiles_Data;