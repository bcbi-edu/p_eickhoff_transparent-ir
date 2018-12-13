package hello;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopScoreDocCollector;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.util.StringUtils;
import org.apache.lucene.search.Explanation;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.StringTokenizer;
import java.util.TreeMap;
import org.apache.lucene.analysis.standard.StandardAnalyzer;

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