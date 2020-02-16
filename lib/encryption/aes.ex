defmodule Encryption.AES do
    @aad "AES256GCM" # Use AES 256 Bit Keys for Encryption.
  
    def encrypt(plaintext) do
      iv = :crypto.strong_rand_bytes(16) # create random Initialisation Vector
      key = get_key()    # get the *latest* key in the list of encryption keys
      {ciphertext, tag} =
        :crypto.block_encrypt(:aes_gcm, key, iv, {@aad, to_string(plaintext), 16})
      iv <> tag <> ciphertext # "return" iv with the cipher tag & ciphertext
    end
  
    defp get_key do
        keys = Application.get_env(:encryption, Encryption.AES)[:keys]
        count = Enum.count(keys) - 1 # get the last/latest key from the key list
        get_key(count) # use get_key/1 to retrieve the desired encryption key.
      end
      
    defp get_key(key_id) do
        keys = Application.get_env(:encryption, Encryption.AES)[:keys] # cached call
        Enum.at(keys, key_id) # retrieve the desired key by key_id from keys list.
    end

    def decrypt(ciphertext) do
        <<iv::binary-16, tag::binary-16, ciphertext::binary>> = ciphertext
        :crypto.block_decrypt(:aes_gcm, get_key(), iv, {@aad, ciphertext, tag})
    end
end