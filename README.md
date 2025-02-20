# indiana-school-proficiency-map

Visual depiction of School Corporation and School Proficiency on Indiana State summative test
(ILEARN) and IREAD-3 disaggregated by Subgroup, Grade, and Race/Ethnicity. Map sections representing
school corporations (districts) can be clicked to see the relative proficiency for each school located
within the school corporation.

Sources:
The TopoJSON topology arcs for Indiana school corporations (districts) come from the
"School District Characteristics - Current" data set located at https://data.ed.gov/ (csv, GeoJSON and
Shapefiles). Indiana specific districts were isolated using mapshaper (https://mapshaper.org/).

The TopoJSON topology latitude and longitude point coordinates for individual schools were sourced
from the "Public School Characteristics - Current" data set also located at https://data.ed.gov/.
The JSON file was updated manually to include state specific identifying information using data files
from the Indiana Department of Education (https://www.in.gov/doe/it/data-center-and-reports/).

School and Corporation ILEARN and IREAD academic data is from the Indiana Department of Education
(https://www.in.gov/doe/it/data-center-and-reports/).

Note that the ED Characteristics files typically lag the academic data by at least a year. More recent data
for both schools and districts may be found at https://nces.ed.gov/ccd/schoolsearch/. Select a State from
the dropdown. Click Search and then Download Excel File.

Python scripts (not included) are used to automate the generation and update of the csv and json files.