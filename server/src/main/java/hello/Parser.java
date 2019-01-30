package hello;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.StringTokenizer;

public class Parser {
/*
    Parses entire directory to create JSON of term frequency
*/
    private DirectoryReader reader;
    public Parser(DirectoryReader _reader) throws IOException {
        reader = _reader;   
    }

    public double getNumDocs() {
        return reader.maxDoc();
    }
    public double getAverageFieldLength() throws IOException {
        double count = 0;
        double numOfDocs = reader.maxDoc();
        for (int i=0; i<numOfDocs; i++) {
            Document doc = reader.document(i);
            String content = doc.get("content").toLowerCase();
            StringTokenizer tokens = new StringTokenizer(content);
            count += tokens.countTokens();
            // do something with docId here...
        }
        return count/numOfDocs;

    }
    public HashMap<String, Integer> getDocFrequencies() throws IOException {
        HashMap<String, Integer> termFrequency = new HashMap<String, Integer>();
        for (int i=0; i<reader.maxDoc(); i++) {
            Document doc = reader.document(i);
            String content = doc.get("content").toLowerCase();
            String[] words = content.replaceAll("[^a-zA-Z ]", "").toLowerCase().split("\\s+");
            for (String word : words) {
                if (termFrequency.containsKey(word)) {
                    termFrequency.put(word, termFrequency.get(word) + 1);
                } else {
                    termFrequency.put(word, 1);
                }
            }
            // do something with docId here...
        }
        System.out.println("GOT document frequencies... " + termFrequency.size());
        return termFrequency;
    }
}