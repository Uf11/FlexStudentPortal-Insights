setTimeout(function () {
    load();
}, 1000); // 1000 milliseconds = 1 second

function ftn_calculateMarks(id) {
    var temp = "totalColumn_" + id;
    var tempGrandObtMarks = 0;
    $('.sum_table').each(function (t) {

        $(this).find("." + temp).each(function () {
            $(this).find(".totalColObtMarks").each(function () {
                if ($(this).text() != "") {
                    tempGrandObtMarks += parseFloat($(this).text());
                }
            });

        });

    });
    // Check if there is already a value and it meets certain conditions before updating
    if ((!isNaN(tempGrandObtMarks) && tempGrandObtMarks != 0 && !$("#GrandtotalObtMarks_" + id).html())) {
        // Update the HTML content only if there is no existing value
        $("#GrandtotalObtMarks_" + id).html(tempGrandObtMarks.toFixed(2));
    }
}


function load() {

    // for every tab-pane
    let tabPanes = document.getElementsByClassName("tab-pane");
    for (let i = 0; i < tabPanes.length; i++) {
        let innerHTML = tabPanes[i].innerHTML;
        let startIndex = innerHTML.indexOf("ftn_calculateMarks(");
        let endIndex = innerHTML.indexOf(")", startIndex);
        let substring = innerHTML.substring(startIndex, endIndex);
        let tabPaneID = parseInt(substring.replace("ftn_calculateMarks(", "").replaceAll("'", ""));
        // get id of the current tab-pane
        var courseCode = $(tabPanes[i]).attr('id');
        console.log("courseCode", courseCode, "tabPaneID", tabPaneID);

        if (isNaN(tabPaneID)) {
            console.log("tabPaneID is NaN", tabPaneID);
            continue;
        }

        // Construct the ID of the <td> element to check for existence
        var tdIdToCheck = "GrandtotalClassAvg_" + tabPaneID;

        // Check if a <td> element with the specified ID exists in the tbody
        var tdExists = $('#' + courseCode + "-Grand_Total_Marks").find('table tbody').find('td#' + tdIdToCheck).length > 0;

        // If the <td> element exists, return without appending new content
        if (tdExists) {
            return;
        }

        // Construct the new <tr> element
        var newTableRow =
            '<tr class="totalColumn_' + tabPaneID + '">' +
            '<td class="text-center" id="GrandtotalColMarks_' + tabPaneID + '"></td>' +
            '<td class="text-center" id="GrandtotalObtMarks_' + tabPaneID + '"></td>' +
            '<td class="text-center" id="GrandtotalClassAvg_' + tabPaneID + '"></td>' +
            '<td class="text-center" id="GrandtotalClassMin_' + tabPaneID + '"></td>' +
            '<td class="text-center" id="GrandtotalClassMax_' + tabPaneID + '"></td>' +
            '<td class="text-center" id="GrandtotalClassStdDev_' + tabPaneID + '"></td>' +
            '</tr>';

        // Append the new <tr> element to the tbody
        $('#' + courseCode + "-Grand_Total_Marks").find('table tbody').append(newTableRow);


        ftn_calculateMarks(tabPaneID);

    }
}
