create or replace Function hqs_compare_to_national
   ( V_QMEASUREID IN varchar2,v_score IN float  )
   RETURN number
IS

  CURSOR c_quality
  IS
    SELECT QSID,QNATIONAL_SCORE,QCOMPARE_TO_NATIONAL FROM QUALITY_PERFORMANCE_HQS WHERE QMEASUREID = V_QMEASUREID;

BEGIN

	FOR v_cur IN c_quality
	LOOP

	IF (v_cur.QCOMPARE_TO_NATIONAL='Worse than the National Benchmark') AND (v_score>=v_cur.QNATIONAL_SCORE)  THEN
		RETURN V_CUR.QSID;

	ELSIF (v_cur.QCOMPARE_TO_NATIONAL='No Different than National Benchmark') and (v_score >= v_cur.QNATIONAL_SCORE) THEN
		RETURN V_CUR.QSID;

	ELSIF (v_cur.QCOMPARE_TO_NATIONAL='Better than the National Benchmark') and (v_score >= v_cur.QNATIONAL_SCORE) THEN
RETURN V_CUR.QSID;

ELSIF	 (v_cur.QCOMPARE_TO_NATIONAL='Not Available') THEN
RETURN V_CUR.QSID;

else
RETURN NULL;

end IF;

END LOOP;

END;
