package hello;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.TopScoreDocCollector;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.RAMDirectory;
import org.apache.lucene.util.Version;
import org.springframework.util.StringUtils;
import org.apache.lucene.search.Explanation;
import org.apache.lucene.search.similarities.Similarity.SimWeight;
import org.apache.lucene.search.similarities.BasicStats;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.springframework.util.StringUtils;

public class SearchEngine {
    
    private StandardAnalyzer analyzer;
    private DirectoryReader reader;
    private static String INDEX_DIRECTORY = "../index";
    public SearchEngine() throws IOException, ParseException {

	// 0. Specify the analyzer for tokenizing text.
        //    The same analyzer should be used for indexing and searching
        this.analyzer = new StandardAnalyzer();
        Directory directory = FSDirectory.open(Paths.get(INDEX_DIRECTORY));
        reader = DirectoryReader.open(directory);

    }

    private void addDoc(IndexWriter w, String title, String isbn) throws IOException {
        Document doc = new Document();
        doc.add(new TextField("title", title, Field.Store.YES));

        // use a string field for isbn because we don't want it tokenized
        doc.add(new StringField("isbn", isbn, Field.Store.YES));
        w.addDocument(doc);

    }
    
    public HashMap<String, HashMap<String, Double>> getResults(String querystr) {
        Query q = null;
		try {
			q = new QueryParser("content", analyzer).parse(QueryParser.escape(querystr));
		} catch (org.apache.lucene.queryparser.classic.ParseException e) {
            e.printStackTrace();
            return null;
        }
        int hitsPerPage = 50;
        try {
            IndexSearcher searcher = new IndexSearcher(this.reader);
            TopScoreDocCollector collector = TopScoreDocCollector.create(hitsPerPage);
            searcher.search(q, collector);
            ScoreDoc[] hits = collector.topDocs().scoreDocs;
            System.out.println("Found " + hits.length + " hits.");
            HashMap<String, HashMap<String, Double>> toReturn = new HashMap<String, HashMap<String, Double>>();
            double avgFieldLength = this.getAvgFieldLength(searcher, hits);
            //print out explanation and scores
            for (int i = 0; i < hits.length; ++i) {
                int docId = hits[i].doc;
                Document d = searcher.doc(docId);
                // individual scores
                String title = d.get("title");
                HashMap<String, Double> map = new HashMap<>(); 
                BM25 scorer = new BM25();
                double finalScore = 0;
                for (String word : querystr.split(" ")) {
                    if (map.containsKey(word)) {
                        continue;
                    }
                    double docFreq = this.getDocFreq(searcher, hits, word);
                    double fieldLength = title.split(" ").length;
                    double docCount = 11;
                    double freq = this.getFreq(title, word);
                    double score = scorer.score(docCount, docFreq, freq, fieldLength, avgFieldLength);
                    finalScore += score;
                    map.put(word, score);
                }
                // System.out.println("MAP: " + map);
                // System.out.println("SCORE: " + finalScore);
                Explanation explanation = searcher.explain(q, docId); 
                // make string to return
                // toReturn += "Explanation: " + hits[i].score + "\n";
                // print out Explaination
                toReturn.put(Arrays.toString(new String[] {title, d.get("content")}), map);
                // toReturn.put(d.get("content"), map);
                // System.out.println("Explanation: " + hits[i].score);
                // System.out.println((i + 1) + ". " + d.get("isbn") + "\t" + d.get("title"));
                // System.out.println(title);
                // System.out.println(explanation.toString());

            }   
            return toReturn;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            // e.printStackTrace();
            return null;
        }
    }

    public double getAvgFieldLength(IndexSearcher searcher, ScoreDoc[] docs) throws IOException {
        double count = 0;
        for (int i=0; i<docs.length; i++) {
            int docId = docs[i].doc;
            Document d = searcher.doc(docId);
            count += d.get("title").split(" ").length;
        }
        return count/docs.length;
    }

    public double getFreq(String query, String word) {
        query = query.toLowerCase();
        double count = StringUtils.countOccurrencesOf(query, word);
        return count;
    }

    public double getDocFreq(IndexSearcher searcher, ScoreDoc[] docs, String word) throws IOException {
        double count = 0;
        for (int i=0; i<docs.length; i++) {
            int docId = docs[i].doc;
            Document d = searcher.doc(docId);
            String title = d.get("title").toLowerCase();
            count += StringUtils.countOccurrencesOf(title, word);
        }
        return count;
    }
}
