State (Number of measures taken)  

select fstate,count from (select FSTATE,COUNT(*) count
FROM HOSPITAL_MEASURES_HQS_VW
GROUP BY FSTATE
ORDER BY 2 desc) where rownum <15

City (Number of Measures Taken)

select FCITY,VALUE
from (select FCITY,count(*)  as value from HOSPITAL_MEASURES_HQS_VW group by FCITY order by 2 desc) where rownum <15

Zipcode (Number of Measures Taken)

select fzipcode, count from (select fzipcode,count(*) count
from HOSPITAL_MEASURES_HQS_VW
group by fzipcode
order by 2 desc) where rownum <15

County (Number of Measures taken)

select fcounty, count from (Select FCOUNTY,COUNT(*) count
FROM FACILITY_HQS GROUP BY fcounty 
order by 2 desc) where rownum <15

Hospital Rating (Best Hospital Rated)

select hname,to_number(HQUALITY_RATING) from (select HNAME,HQUALITY_RATING from HOSPITAL_DETAILS_HQS
ORDER BY 2 DESC) where rownum <15

Measure of Worse Quality City

select FNAME, value 
from 
(select FNAME , count(*) value
from HOSPITAL_MEASURES_HQS_VW where QCOMPARE_TO_NATIONAL='Better than the National Benchmark'
group by FNAME
order by 2 desc) where rownum <30

City Hospital Best  National Score Comparision

select FCITY, value 
from 
(select FCITY , count(*) value
from HOSPITAL_MEASURES_HQS_VW where QCOMPARE_TO_NATIONAL='Better than the National Benchmark'
group by FCITY
order by 2 desc) where rownum <100