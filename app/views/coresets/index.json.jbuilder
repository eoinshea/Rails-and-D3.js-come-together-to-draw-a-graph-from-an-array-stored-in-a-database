json.array!(@coresets) do |coreset|
  json.extract! coreset, :id
  json.url coreset_url(coreset, format: :json)
end
