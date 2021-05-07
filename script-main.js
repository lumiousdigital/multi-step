var firstName, lastName, emailAddress, phoneNumber, deadline, website, agreement;
var currentStep = 1;
var currentUploader;
var products = [];
var uploadedFiles = [];
var driveUploaderId = 'W4MDc7RNWJ'


$(".goToStep-2").click(function() {
    console.log('ok');
    $("#step" + currentStep).addClass('step-hidden');
    $("#step2").removeClass('step-hidden');
    currentStep = 2;
});

$(".goToStep-4").click(function() {
    getStep2Data();
    if (firstName && lastName && emailAddress && phoneNumber && website && agreement) {
        $("#step" + currentStep).addClass('step-hidden');
        $("#step4").removeClass('step-hidden');
        currentStep = 4;
        $('#step-2-error-message').addClass('validation-error');
        $('#step-4-error-message').addClass('validation-error');
    } else {
        $('#step-2-error-message').removeClass('validation-error');
    }
});

$(".goToStep-5").click(function() {
        getStep2Data();
        if (firstName && lastName && emailAddress && phoneNumber && website && agreement) {
            if (validateProduct(currentProduct)) {
                $("#product-" + currentProduct + "-form").addClass('product-hidden');
                $("#product-" + currentProduct + "-collapsed").removeClass('product-hidden');
                $("#product-" + currentProduct + "-collapsed").find('.added-product-label').text($("#Product-" + currentProduct + "-Name").val());
                products[currentProduct-1] = validateProduct(currentProduct);
            } else {
                if (products.length) {
                    $("#product-" + currentProduct + "-form").parent().remove();
                    currentProduct--;
                }
            }
            if (products.length) {
                $("#step4").addClass('step-hidden');
                $("#step5").removeClass('step-hidden');
                currentStep = 5;
                $('#json-data').text(JSON.stringify(products));
                $('#step-4-error-message').addClass('validation-error');
            } else {
                $('#step-4-error-message').removeClass('validation-error');
            }
            $(".save-product-button").addClass('button-hidden');
            $(".add-product-button").removeClass('button-hidden');
            $('#step-2-error-message').addClass('validation-error');
        } else {
            $('#step-2-error-message').removeClass('validation-error');
        }
});

$(".detailed-button").click(function() {
    $("#step1").addClass('step-hidden');
    $("#step2").removeClass('step-hidden');
    currentStep++;
});

$("#step2-next").click(function() {
   getStep2Data();
   if (firstName && lastName && emailAddress && phoneNumber && website && agreement) {
       $("#step2").addClass('step-hidden');
       $("#step3").removeClass('step-hidden');
       currentStep++;
       $('#step-2-error-message').addClass('validation-error');
   } else {
       $('#step-2-error-message').removeClass('validation-error');
   }
});

$("#step3-next").click(function() {
    $("#step3").addClass('step-hidden');
    $("#step4").removeClass('step-hidden');
    currentStep++;
});

$("#step4-next").click(function() {
    if (validateProduct(currentProduct)) {
        $("#product-" + currentProduct + "-form").addClass('product-hidden');
        $("#product-" + currentProduct + "-collapsed").removeClass('product-hidden');
        $("#product-" + currentProduct + "-collapsed").find('.added-product-label').text($("#Product-" + currentProduct + "-Name").val());
        products[currentProduct-1] = validateProduct(currentProduct);
    } else {
        if (products.length) {
            $("#product-" + currentProduct + "-form").parent().remove();
            currentProduct--;
        }
    }
    if (products.length) {
        $("#step4").addClass('step-hidden');
        $("#step5").removeClass('step-hidden');
        $('#json-data').text(JSON.stringify(products));
        currentStep++;
        $('#step-4-error-message').addClass('validation-error');
    } else {
        $('#step-4-error-message').removeClass('validation-error');
    }
    $(".save-product-button").addClass('button-hidden');
    $(".add-product-button").removeClass('button-hidden');
});

function getStep2Data() {
    firstName = $("[name='First-Name']").val();
    lastName = $("[name='Last-Name']").val();
    emailAddress = $("[name='Email-Address']").val();
    phoneNumber = $("[name='Phone-Number']").val();
    deadline = $("[name='Deadline']").val();
    website = $("[name='Website']").val();
    agreement = $("[name='Agreement']").is(':checked');
}

function validateProduct(number) {
    let productName = $("#Product-" + number + "-Name").val();
    let productMaterials = $("#Product-" + number + "-Materials").val();
    let productHeight = $("#Product-" + number + "-Height").val();
    let productLength = $("#Product-" + number + "-Length").val();
    let productWidth = $("#Product-" + number + "-Width").val();
    let productAgreement = $("#Product-" + number + "-Agreement").is(':checked');
    if (productName &&
        productMaterials &&
        productHeight &&
        productLength &&
        productWidth &&
        productAgreement &&
        uploadedFiles[number-1] &&
        'product-' + number + "-front" in uploadedFiles[number-1] &&
        'product-' + number + "-back" in uploadedFiles[number-1]) {
        return {
            name: productName,
            materials: productMaterials,
            height: productHeight,
            length: productLength,
            width: productWidth,
            files: uploadedFiles[number-1]
        }
    } else {
        return false;
    }
}

var currentProduct = 1;

$(".add-product-button").click(function() {
    if (validateProduct(currentProduct)) {
        $("#product-" + currentProduct + "-collapsed").removeClass('product-hidden');
        $("#product-" + currentProduct + "-collapsed").find('.added-product-label').text($("#Product-" + currentProduct + "-Name").val());
        $("#product-" + currentProduct + "-form").addClass('product-hidden');
        products.push(validateProduct(currentProduct));
        currentProduct = $(".all-products").children().length + 1;
        addProduct(currentProduct);
        reload_js()
        $('#step-4-error-message').addClass('validation-error');
    } else {
        $('#step-4-error-message').removeClass('validation-error');
    }
});

$(".save-product-button").click(function() {
    if (validateProduct(currentProduct)) {
        $("#product-" + currentProduct + "-collapsed").removeClass('product-hidden');
        $("#product-" + currentProduct + "-collapsed").find('.added-product-label').text($("#Product-" + currentProduct + "-Name").val());
        $("#product-" + currentProduct + "-form").addClass('product-hidden');
        $(".save-product-button").addClass('button-hidden');
        $(".add-product-button").removeClass('button-hidden');
        $('#step-4-error-message').addClass('validation-error');
        editProduct(currentProduct - 1, validateProduct(currentProduct))
    } else {
        $('#step-4-error-message').removeClass('validation-error');
    }
});

$(document).on( 'click', '.button-edit', function() {
    if (validateProduct(currentProduct)) {
        $("#product-" + currentProduct + "-form").addClass('product-hidden');
        $("#product-" + currentProduct + "-collapsed").removeClass('product-hidden');
        $("#product-" + currentProduct + "-collapsed").find('.added-product-label').text($("#Product-" + currentProduct + "-Name").val());
        editProduct(currentProduct-1, validateProduct(currentProduct))
    } else {
        $("#product-" + currentProduct + "-form").parent().remove();
    }
    $(".save-product-button").removeClass('button-hidden');
    $(".add-product-button").addClass('button-hidden');
    currentProduct = $(this).attr('id').split('-')[1];
    $("#product-" + currentProduct + "-collapsed").addClass('product-hidden');
    $("#product-" + currentProduct + "-form").removeClass('product-hidden');
});

function editProduct(id, product) {
    products[id] = product;
}

function reload_js() {
    $('script[src="https://driveuploader.com/upload/'+driveUploaderId+'/embed.js"]').remove();
    $('<script>').attr('src', 'https://driveuploader.com/upload/'+driveUploaderId+'/embed.js').appendTo('body');
}

function addProduct(number) {
    $(".all-products").append(`<div class="product-wrapper">
              <div id="product-${number}-form" class="product-form-wrapper">
                <div class="fieldset is-on-upload">
                  <label for="Product-${number}-Name" class="field-label">Product Name</label>
                  <input type="text" class="input w-input" maxlength="256" name="Product-Name" data-name="Product Name" placeholder="e.g. Tan Leather Sofa" id="Product-${number}-Name">
                </div>
                <div class="fieldset is-on-upload">
                  <div class="fieldset-info">
                    <label for="Product-${number}-Materials" class="field-label">Materials</label>
                    <figure class="hint hint-materials">
                      <img src="images/hint.png" loading="lazy" width="19" height="18" alt="" class="hint-img">
                    </figure>
                  </div>
                  <input type="text" class="input w-input" maxlength="256" name="Materials" data-name="Materials" placeholder="e.g. Leather + Metal " id="Product-${number}-Materials">
                </div>
                <div class="fieldset is-full">
                  <div class="fieldset-info">
                    <label for="Product-${number}-Height" class="field-label">DIMENSIONS IN INCHES (HEIGHT | LENGTH | WIDTH)</label>
                    <figure class="hint hint-dimension">
                      <img src="images/hint.png" loading="lazy" width="19" height="18" alt="" class="hint-img">
                    </figure>
                  </div>
                  <div class="input-group">
                    <input type="tel" class="input-number w-input" maxlength="256" name="Product-Height" data-name="Product Height" placeholder="72”" id="Product-${number}-Height">
                    <input type="tel" class="input-number w-input" maxlength="256" name="Product-Length" data-name="Product Length" placeholder="160”" id="Product-${number}-Length">
                    <input type="tel" class="input-number w-input" maxlength="256" name="Product-Width" data-name="Product Width" placeholder="60”" id="Product-${number}-Width">
                  </div>
                </div>
                <div class="fieldset is-full">
                  <div class="fieldset-info">
                    <label class="field-label">UPLOAD PRODUCT IMAGES OR 3D FILES</label>
                    <figure class="hint hint-files">
                      <img src="images/hint.png" loading="lazy" width="19" height="18" alt="" class="hint-img">
                    </figure>
                  </div>
                  <label class="w-checkbox checkbox is-on-opload">
                    <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-icon"></div>
                    <input type="checkbox" id="Product-${number}-Agreement" name="Product-Agreement" data-name="Product Agreement" style="opacity:0;position:absolute;z-index:-1">
                    <span for="Product Agreement" class="w-form-label">
                      I have read the <span class="guide-toggle">
                      <strong>How to Upload Guide</strong>
                    </span> carefully. Note: delays may occur if assets do not meet quality guidelines.</span>
                  </label>
                  <div class="upload-grid">
                    <div class="upload-box" id="product-${number}-front">
                      <div>FRONT*</div>
                      <div class="driveuploader-replace required"></div>
                    </div>
                    <div class="upload-box" id="product-${number}-back">
                      <div>BACK*</div>
                      <div class="driveuploader-replace required"></div>
                    </div>
                    <div class="upload-box" id="product-${number}-right-side">
                      <div>RIGHT SIDE</div>
                      <div class="driveuploader-replace"></div>
                    </div>
                    <div class="upload-box" id="product-${number}-left-side">
                      <div>LEFT SIDE</div>
                      <div class="driveuploader-replace"></div>
                    </div>
                    <div class="upload-box" id="product-${number}-underneath">
                      <div>UNDERNEATH</div>
                      <div class="driveuploader-replace"></div>
                    </div>
                    <div class="upload-box" id="product-${number}-top">
                      <div>ON TOP</div>
                      <div class="driveuploader-replace"></div>
                    </div>
                  </div>
                  <div id="w-node-_28f9b9bc-2598-6637-e070-cc95a77e199b-8b257a5b" class="note">*Required Angles</div>
                </div>
              </div>
              <div id="product-${number}-collapsed" class="added-product product-hidden">
                <div class="added-product-main">
                  <div class="added-product-label">Product Name Here</div>
                  <a href="#" id="product-${number}-edit" class="button-edit">+ Edit Details</a>
                </div>
                <div class="added-product-success">
                  <figure class="product-check">
                    <img src="images/noun_tick_3547924.png" loading="lazy" width="28" height="28" alt="" class="check-img">
                  </figure>
                  <div>Details Complete</div>
                </div>
              </div>
            </div>`);
}

$(document).on( 'click', '.upload-box', function() {
    currentUploader = $(this).attr('id');
});

var du_instance;

function onbeforeupload(done, files) {
    currentUploader = $('.dragging').length ? $('.dragging').parent().parent().attr('id') : currentUploader;
    du_instance.setCustomMetadata('name', currentUploader);
    du_instance.setCustomMetadata('email', emailAddress);
    currentUploader = undefined;
    done(); // continue the upload
}

function driveUploaderCallback(status, result, instance) {
    if (status == 'start') {
        du_instance = instance;
        du_instance.setHook('beforeupload', onbeforeupload);
        du_instance.setCustomSubfolderName(emailAddress);
    }
    if(status == 'done') {
        if(!uploadedFiles[currentProduct-1]) {uploadedFiles[currentProduct-1] = {}}
        uploadedFiles[currentProduct-1][result.metadata.name] = result.files[0].link;
    }
}
