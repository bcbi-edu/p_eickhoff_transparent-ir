package hello;

public class BM25 {

    /** The constant k_1.*/
    private double k_1 = 1.2d;

    /** The constant k_3.*/
    private double k_3 = 8d;

    /** The parameter b.*/
    private double b;

    /** A default constructor.*/
    public BM25() {
            super();
            b = 0.75d;
    }
    
    /**
     * Returns the name of the model.
     * @return the name of the model
     */
    public final String getInfo() {
            return "BM25 >> b="+b +", k_1=" + k_1 +", k_3=" + k_3;
    }
    
    public final double score(double docCount, double docFreq, double freq,
                              double fieldLength, double avgFieldLength) {
    	
            double idf = Math.log(1400.0 + (docCount - docFreq + 0.5)/(docFreq + 0.5)); //1400 documents
            double tfNorm = (freq * (k_1 + 1))/
                            (freq + k_1 * (1 - b + b * fieldLength/avgFieldLength));
            // multiply the weight with idf 
            double score = idf * tfNorm; //multiplying by 100
            System.out.println("docCount: " + docCount);
            System.out.println("docFreq: " + docFreq);
            System.out.println("freq: " + freq);
            System.out.println("fieldLength: " + fieldLength);
            System.out.println("avgFieldLength: " + avgFieldLength);
            System.out.println("idf: " + idf);
            System.out.println("tfNorm: " + tfNorm);
            System.out.println("Score: " + score);
            return score;
    }


    /**
     * Sets the b parameter to BM25 ranking formula
     * @param b the b parameter value to use.
     */
    public void setParameter(double b) {
        this.b = b;
    }


    /**
     * Returns the b parameter to the BM25 ranking formula as set by setParameter()
     */
    public double getParameter() {
        return this.b;
    }

}