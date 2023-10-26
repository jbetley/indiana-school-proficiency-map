# indiana-school-proficiency-map

Visual depiction of School Corporation and School Proficiency on Indiana
State summative test (ILEARN) from 2019 - 2023 (skipping pandemic year of
2020), broken down by Subgroup, Grade, and Race/Ethnicity. Map colors
indicate school corporation totals for the selected group/subject. Users
can click on school corporation shapes to see relative proficiency for
each school located within the school corporation.

The map uses TopoJSON topology arcs for all Indiana school corporations (districts)
updated through 2021 beginning with the latest School District Characteristics data
available from data.ed.gov (https://data.ed.gov/dataset/school-district-characteristics-2020-21)
which is currently 2020-21. The file was filtered using mapshaper (https://mapshaper.org/),
and then manually updated to include state specific identifying information using data files
from the Indiana Department of Education (https://www.in.gov/doe/it/data-center-and-reports/).
The map also uses TopoJSON topology latitude and longitude point coordinatesm for
all Indiana public schools beginning with the latest Public School Characteristics data
available from data.ed.gov (https://data.ed.gov/dataset/public-school-characteristics-2020-21)
which is also 2020-21. The file was filtered using mapshaper (https://mapshaper.org/),
and then manually updated to include state specific identifying information using data files
from the Indiana Department of Education (https://www.in.gov/doe/it/data-center-and-reports/)
and the NCES directory file for Indiana from  https://nces.ed.gov/ccd/schoolsearch/.

The geo_school file is updated through 2023. The geo_corporation file is updated through 2021.

School and Corporation ILEARN academic data is from the Indiana Department of Education (https://www.in.gov/doe/it/data-center-and-reports/) and is updated through 2023.