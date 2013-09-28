 $(document).ready(function(){

        var input = localStorage.getItem('myInput');

    $('#search_box').val(input);
    $('#search_button').click(function(){
        
        var value = $('#search_box').val();
    $.ajax({
         type: "GET",
         url: "http://rapidata-api.herokuapp.com/datasets/retrieve_from_terms.xml",
         //url:"retrieve_from_terms.json",
         dataType:"xml",
         async:"true",

         data:{"terms":value},
        success: function (xml) {

            // Parse the xml file and get data
                 var result="";
                 $("#search_result").html(result);
                var i=1;
                $(xml).find('dataset').each(function() {
                 // Do something to each item here...
                        var data = $(this).find('title').text();
                        var data1 = $(this).find('description').text();
                        var tags = "";
                        $(this).find('term').each(function(){
                            tags += $(this).find('value').text() +" \, ";

                        });
                        
                         result += '<div class ="search_head">'+data+"</div>"+
                             '<div class="search_desc">'+data1+"</div>"+
                             '<div class="tag">'+"Related Tags are "+tags+"</div>"+
                             '<div class= "download_links">'+
                                                '<div class="row">'+
                                            '<div class="col-md-4">'+
                                            '</div>'+
                                            '<div class="col-md-2">'+
                                                '<button type="button" class="btn btn-info ">    Download in xml    </button>'+
                                            '</div>'+
                                            '<div class="col-md-2">'+
                                                '<button type="button" class="btn btn-info ">    Download in excel    </button>'+

                                            '</div>'+
                                            '<div class="col-md-4">'+
                                            '</div>'+
                                            '</div>'+
                                            '</div>';
                                         
                             $('#search_result').html(result);
                          i++;
                    });
                    
               
        },
        error: function(){
                alert("Oops!Something went wrong.");
        }

  });

    return false;
    });
});
