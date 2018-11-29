package hello;

import java.io.IOException;

import org.apache.lucene.queryparser.classic.ParseException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    // private static final String template = "%s";
    // private final AtomicLong counter = new AtomicLong();
    private SearchEngine engine;
    
    public SearchController() throws IOException, ParseException {
        this.engine = new SearchEngine();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/search")
    public Search search(@RequestParam(value="name", defaultValue="Missing Query") String name) {
        return new Search(this.engine.getResults(name));
        //counter.incrementAndGet()
    }
}
