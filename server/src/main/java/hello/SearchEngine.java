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
import org.apache.lucene.store.RAMDirectory;
import org.apache.lucene.util.Version;
import org.springframework.util.StringUtils;
import org.apache.lucene.search.Explanation;
import org.apache.lucene.search.similarities.Similarity.SimWeight;
import org.apache.lucene.search.similarities.BasicStats;

import java.io.IOException;
import java.util.HashMap;

import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.springframework.util.StringUtils;
public class SearchEngine {
    
    private StandardAnalyzer analyzer;
    private Directory index;
    public SearchEngine() throws IOException, ParseException {

	// 0. Specify the analyzer for tokenizing text.
        //    The same analyzer should be used for indexing and searching
        this.analyzer = new StandardAnalyzer();

        // 1. create the index
        this.index = new RAMDirectory();

        IndexWriterConfig config = new IndexWriterConfig(analyzer);

        IndexWriter w = new IndexWriter(index, config);
        this.addDoc(w, "Lucene in Action", "193398817");
        this.addDoc(w, "Lucene for Dummies", "55320055Z");
        this.addDoc(w, "Managing Gigabytes", "55063554A");
        this.addDoc(w, "The Art of Computer Science", "9900333X");
        this.addDoc(w, "Test Document 1", "1234567");
        this.addDoc(w, "Article on Computer Science", "346234235");
        this.addDoc(w, "Information Retrieval is Fun", "5463456453");
        this.addDoc(w, "Datathon", "345654635");
        this.addDoc(w, "Lucene is Cool", "565364y546");
        this.addDoc(w, "Straightforward Lucene", "345664525");
        this.addDoc(w, "Lucene in 30 Days", "k435k534k");
        w.close();
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
			q = new QueryParser("title", analyzer).parse(QueryParser.escape(querystr));
		} catch (org.apache.lucene.queryparser.classic.ParseException e) {
            e.printStackTrace();
            return null;
        }
        int hitsPerPage = 10;
		IndexReader reader;
        try {
            reader = DirectoryReader.open(this.index);
            IndexSearcher searcher = new IndexSearcher(reader);
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
                //
                // individual scores
                String title = d.get("title");
                HashMap<String, Double> map = new HashMap<>(); 
                BM25 scorer = new BM25();
                double finalScore = 0;
                for (String word : querystr.split(" ")) {
                    double docFreq = this.getDocFreq(searcher, hits, word);
                    System.out.println("DocFreq: " + docFreq);
                    double fieldLength = title.split(" ").length;
                    double docCount = 11;
                    double freq = this.getFreq(title, word);
                    double score = scorer.score(docCount, docFreq, freq, fieldLength, avgFieldLength);
                    finalScore += score;
                    map.put(word, score);
                }
                System.out.println("MAP: " + map);
                System.out.println("SCORE: " + finalScore);
                Explanation explanation = searcher.explain(q, docId); 
                // make string to return
                // toReturn += "Explanation: " + hits[i].score + "\n";
                // print out Explaination
                toReturn.put(title, map);
                System.out.println("Explanation: " + hits[i].score);
                System.out.println((i + 1) + ". " + d.get("isbn") + "\t" + d.get("title"));
                System.out.println(explanation.toString());

            }   
            // return toReturn != [] ? toReturn : "No Result";
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
        System.out.println("GETTING FREQ: " + query + " " + word);
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
