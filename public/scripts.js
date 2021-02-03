// [1, 2, ..., 12, 13, 14, ..., 23, 24]

function paginate(selectedPage, totalPages){
    let pages = [],
    oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++){

        let finalAndInitial = currentPage == 1 || currentPage == 2 || currentPage == totalPages - 1 || currentPage == totalPages
        const pagesAfter = currentPage <= selectedPage + 1
        const pagesBefore = currentPage >= selectedPage - 1

        if (finalAndInitial || pagesAfter && pagesBefore ){
            
            if (oldPage && currentPage - oldPage > 2){
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

const pagination = document.querySelector(".pagination")
const filter = pagination.dataset.filter
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const pages = paginate(page, total)

let elements = ""

for (let page of pages){
    if (String(page).includes("...")) {
        elements += `<span>${page}</span>`
    } else {
        if (filter){
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }
    
}

pagination.innerHTML = elements



