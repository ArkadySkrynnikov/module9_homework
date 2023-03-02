const xmlString = 
` 
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

function MakeJavaScriptFromXML (xml) {
  const firstParser = new DOMParser();

  const xmlDOMparser = firstParser.parseFromString(xml,"text/xml");

  let parseToJS = [];

  const students = xmlDOMparser.querySelectorAll("student");

  students.forEach(person => {
    let one = {
      name:`${person.querySelector("first").textContent} ${person.querySelector("second").textContent}`,
      age: Number(person.querySelector("age").textContent),
      prof: person.querySelector("prof").textContent,
      lang: person.querySelector("name").getAttribute("lang")
    }
    parseToJS.push(one);
  })
  return console.log(parseToJS)
}

MakeJavaScriptFromXML(xmlString)



