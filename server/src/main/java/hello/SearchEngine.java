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
import java.util.TreeMap;
import org.apache.lucene.analysis.standard.StandardAnalyzer;

public class SearchEngine {
    
    private StandardAnalyzer analyzer;
    private DirectoryReader reader;
    private static String INDEX_DIRECTORY = "index";
    private ArrayList<String> discriptions;
    private double averageFieldLength;
    private HashMap<String, Integer> docFrequencies;
    private double numDocs;
    public SearchEngine() throws IOException, ParseException {

	// 0. Specify the analyzer for tokenizing text.
        //    The same analyzer should be used for indexing and searching
        analyzer = new StandardAnalyzer();
        Directory directory = FSDirectory.open(Paths.get(INDEX_DIRECTORY));
        reader = DirectoryReader.open(directory);
        discriptions= new ArrayList<String>();
        Parser parser = new Parser(reader);
        averageFieldLength = parser.getAverageFieldLength();
        docFrequencies = parser.getDocFrequencies();
        numDocs = parser.getNumDocs();

    }

    private void addDoc(IndexWriter w, String title, String isbn) throws IOException {
        Document doc = new Document();
        doc.add(new TextField("title", title, Field.Store.YES));

        // use a string field for isbn because we don't want it tokenized
        doc.add(new StringField("isbn", isbn, Field.Store.YES));
        w.addDocument(doc);

    }
    public ArrayList<String> getDescriptions() {
        Collections.sort(this.discriptions);
        return this.discriptions;
    }

    public TreeMap<String, HashMap<String, Double>> getResults(String querystr) {
        this.discriptions .clear();
        Query q = null;
		try {
			q = new QueryParser("content", analyzer).parse(QueryParser.escape(querystr));
		} catch (org.apache.lucene.queryparser.classic.ParseException e) {
            e.printStackTrace();
            return null;
        }
        int hitsPerPage = 50;
        try {
            // System.out.println("MAX: " + reader.maxDoc());
            IndexSearcher searcher = new IndexSearcher(this.reader);
            TopScoreDocCollector collector = TopScoreDocCollector.create(hitsPerPage);
            searcher.search(q, collector);
            ScoreDoc[] hits = collector.topDocs().scoreDocs;
            System.out.println("Found " + hits.length + " hits.");
            TreeMap<String, HashMap<String, Double>> toReturn = new TreeMap<String, HashMap<String, Double>>();
            //print out explanation and scores
            for (int i = 0; i < hits.length; ++i) {
                int docId = hits[i].doc;
                Document d = searcher.doc(docId);
                // individual scores
                String title = d.get("title");
                String content = d.get("content");
                HashMap<String, Double> map = new HashMap<>(); 
                BM25 scorer = new BM25();
                for (String word : querystr.split(" ")) {
                    word = word.toLowerCase();
                    if (map.containsKey(word)) {
                        continue;
                    } else if (!this.docFrequencies.containsKey(word)) {
                        map.put(word, 0.0);
                        continue; 
                    }
                    System.out.println("WORD: " + word);
                    double docFreq = this.docFrequencies.get(word);
                    double fieldLength = content.split(" ").length;
                    double docCount = this.numDocs;
                    double freq = this.getFrequency(content, word);
                    double score = scorer.score(docCount, docFreq, freq, fieldLength, this.averageFieldLength);
                    map.put(word, score);
                    System.out.println();
                }
                toReturn.put(title, map);
                discriptions.add(d.get("content"));

            }   
            return toReturn;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            // e.printStackTrace();
            TreeMap<String, HashMap<String, Double>> error = new TreeMap<String, HashMap<String, Double>>();
            return error;
        }
    }

    public double getFrequency(String query, String word) {
        query = query.toLowerCase();
        double count = StringUtils.countOccurrencesOf(query, word);
        return count;
    }

    public double getDocFreq(IndexSearcher searcher,String word) throws IOException {
        if (word == null) {
            return 0;
        }
        double count = 0;
        for (int i=0; i<reader.maxDoc(); i++) {
            Document d = reader.document(i);
            String title = d.get("title").toLowerCase();
            count += StringUtils.countOccurrencesOf(title, word);
        }
        return count;
    }
}
